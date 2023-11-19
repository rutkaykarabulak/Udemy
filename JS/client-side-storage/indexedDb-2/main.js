const section = document.querySelector("section");
const videos = [
    { name: "crystal" },
    { name: "elf" },
    { name: "frog" },
    { name: "monster" },
    { name: "pig" },
    { name: "rabbit" },
]

let db = null;

function init() {
    initDb();
}

function initDb() {
    const request = window.indexedDB.open("videos_os", 1);

    request.addEventListener("success", () => {
        console.log("Database connection has successfully opened");

        db = request.result;

        displayResults();
    })

    request.addEventListener("upgradeneeded", (e) => {
        db = e.target.result;
        const objectStore = db.createObjectStore("videos_os", {
            keyPath: "name",
            autoIncrement: true
        });

        objectStore.createIndex("mp4", "mp4", {unique: false});
        objectStore.createIndex("webm", "webm", {unique: false});

        console.log("Db setup has finished.");
    })

    request.addEventListener("error", () => {
        console.log("An error happened while opening db.");
    })
}


// displays all the videos stored in indexedDb.
function displayResults() {
    const transaction = db.transaction("videos_os");
    transaction.addEventListener("complete", () => {
        console.log("Get transaction has been completed.");
    })
    for (const video of videos) {
        const transaction = db.transaction("videos_os");
        const request = transaction.objectStore("videos_os").get(video.name);
        request.addEventListener("success", () => {
            if(request.result) {
                createVideoElement(request.result);
            } else {
                fetchVideoAndStore(video);
            }
        })
    }
}
// Creates video element and append it to the section as an article.
function createVideoElement(video) {
    const article = document.createElement("article");
    const videoElement = document.createElement("video");
    videoElement.setAttribute("controls", "");
    const mp4Source = document.createElement("source");
    const webmSource = document.createElement("source");

    const mp4BlobUrl = URL.createObjectURL(video.mp4);
    const webmBlobUrl = URL.createObjectURL(video.webm);

    mp4Source.setAttribute("src", mp4BlobUrl);
    mp4Source.setAttribute("type", "video/mp4");

    webmSource.setAttribute("src", webmBlobUrl);
    webmSource.setAttribute("type", "video/webm");

    videoElement.appendChild(mp4Source);
    videoElement.appendChild(webmSource);

    article.appendChild(videoElement);

    section.appendChild(article);
    
}
// Gets the video from local and store it i indexedDB
function fetchVideoAndStore(video) {
    const baseUrl = `videos/${video.name}`;
    const urlMp4 = baseUrl +".mp4";
    const urlWebm = baseUrl + ".webm";

    const mp4Request = new Request(urlMp4);
    const mp4Promise = fetch(mp4Request).then(response => {if (!response.ok) {console.log("An error occured during fetch" + response.status)} return response.blob()});
    const webmRequest = new Request(urlWebm);
    const webmPromise = fetch(webmRequest).then(response => {if (!response.ok) {console.log("An error occured during fetch" + response.status)} return response.blob()});

    // Wait until all promised are fulfilled.
    Promise.all([mp4Promise, webmPromise]).then((response) => {
        // store the video
        const mp4blob = response[0];
        const webmblob = response[1];
        const payload = {
            name: video.name,
            mp4: mp4blob,
            webm: webmblob
        }
        const transaction = db.transaction("videos_os", "readwrite");
        const request = transaction.objectStore("videos_os").add(payload);

        request.addEventListener("success", () => {
            console.log("Video has stored successfully");
        })

        transaction.addEventListener("complete", () => {
            console.log("Transaction to store video has completed.");
        })
    });
}

init();