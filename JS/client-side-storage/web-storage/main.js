const nameInput = document.querySelector("#entername");
const submit = document.querySelector("#submitname");
const forget = document.querySelector("#forgetname");
const personalGreeting = document.querySelector(".personal-greeting");
const h1 = document.querySelector("h1");

const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");

function init() {
    hideElement(forgetDiv);
    submit.addEventListener("click", save);
    forget.addEventListener("click", remove);
}

function save(e) {
    e.preventDefault();
    const name = nameInput.value;
    if (name) {
        localStorage.setItem("name", name);
        personalGreeting.textContent = `Welcome to our website ${name}! I hope you're having a good time!`;
        h1.textContent = `Welcome ${name}`;
        hideElement(rememberDiv);
        showElement(forgetDiv);
    }
    
}

function remove(e) {
    e.preventDefault();
    const name = localStorage.getItem("name");
    if (name) {
        localStorage.removeItem("name");
        personalGreeting.textContent = "Welcome to our website!";
        h1.textContent = "Our Website";
        nameInput.value = "";
        showElement(rememberDiv);
        hideElement(forgetDiv);
    }
}

// Hides the element depending on its visibility
function hideElement(element) {
    element.style.visibility = "hidden";
}
// Shows the element depending on its visibility
function showElement(element) {
    element.style.visibility = "visible";
}

init();