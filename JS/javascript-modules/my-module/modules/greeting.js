// This module allows you to create greeting message

function greeting(body) {
    const h1 = document.createElement("h1");
    h1.textContent = "Welcome to my website!";
    body.appendChild(h1);
}

export {greeting};