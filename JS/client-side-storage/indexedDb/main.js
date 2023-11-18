const list = document.querySelector(".note-display ul");
const noteTitle = document.querySelector("#title");
const noteBody = document.querySelector("#body");
const button = document.querySelector("button");
let db = null;

function init() {
    initDb();
    button.addEventListener("click", insertNewNote);
}

// Inserts a new note to the indexedDb
function insertNewNote() {
    const title = noteTitle.value;
    const body = noteBody.value;

    const newItem = {
        title: title,
        body: body
    };

    const transaction = db.transaction("notes_os", "readwrite");
    const objectStore = transaction.objectStore("notes_os");
    const request = objectStore.add(newItem);

    request.addEventListener("success", () => {
        console.log("Adding data to the db is success.");
        noteTitle.value = "";
        noteBody.value = "";
    })

    transaction.addEventListener("complete", () => {
        console.log("Transaction is completed.");

        displayNotes();
    })

    transaction.addEventListener("error", () => {
        console.log("Transaction not opened due to error.");
    })




}

// Displays all of the notes in indexedDb
function displayNotes(){
    // iterate over the notes_os
    list.innerHTML = "";

    const objectStore = db.transaction("notes_os").objectStore("notes_os");
    objectStore.openCursor().addEventListener("success", (e) => {
        const cursor = e.target.result;

        if (cursor) {
            const note = cursor.value;
            createNote(note);
            cursor.continue();
        }
        if (!list.firstChild) {
            const p = document.createElement("p");
            p.textContent = "There is no note to show.";
            list.appendChild(p);
        }
    })
}

// Creates set of HTML elements to represent note
function createNote(note) {
    const listItem = document.createElement("li");
    const h3 = document.createElement("h3");
    const para = document.createElement("p");

    h3.textContent = note.title;
    para.textContent = note.body;
    listItem.appendChild(h3);
    listItem.appendChild(para);

    list.appendChild(listItem);

    listItem.setAttribute("note-id", note.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete this note";
    deleteBtn.addEventListener("click", removeNote);

    listItem.appendChild(deleteBtn);
}

// initialize the db
function initDb() {
    const dbRequest = window.indexedDB.open("notes_os", 1);

    dbRequest.addEventListener("error", () => {
        console.log("Database failed to open.");
    })

    dbRequest.addEventListener("success", () => {
        console.log("Database has opened successfully.");
        
        db = dbRequest.result;

        displayNotes();
    })

    dbRequest.addEventListener("upgradeneeded", (e) => {
        db = e.target.result;

        // create the db with auto incremented id key
        const objectStore = db.createObjectStore("notes_os", {
            keyPath: "id",
            autoIncrement: true,
        });

        // define the data type to be stored in objectStore
        objectStore.createIndex("title", "title", {unique:false});
        objectStore.createIndex("body", "body", {unique: false});

        console.log("Database setup is done.");
    })
}

function removeNote(e) {
    const id = Number(e.target.parentNode.getAttribute("note-id"));
    const transaction = db.transaction("notes_os", "readwrite");
    const request = transaction.objectStore("notes_os").delete(id);

    transaction.addEventListener("complete", () => {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        console.log("Transaction is completed.");

        if (!list.firstChild) {
            const listItem = document.createElement("li");
            listItem.textContent = "There is no note to show.";
            list.appendChild(listItem);
          }
    })
}

init();