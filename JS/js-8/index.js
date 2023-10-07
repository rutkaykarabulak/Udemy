// asynchronous javascript

const requestButton = document.querySelector("#request");
const reloadButton = document.querySelector("#reload");
const pre = document.querySelector("pre");
const URL = "http://127.0.0.1:5500/JS/js-8/index.html";
const request = new Request(URL, {
    method: "GET",
    headers: {
        "content-type": "application-json"
    }
});

requestButton.addEventListener("click", async () => {
    pre.textContent = "";
    const response = await fetch(request);
    pre.textContent = "Request has sent with status:" + response.status;
});

reloadButton.addEventListener("click", () => {
    pre.textContent = "";
});