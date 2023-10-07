// events

const div = document.querySelector("#container");

function random(number) {
    return Math.floor(Math.random() * number);
}

function randomColorGenerator() {
    const color = `rgb(${random(255)}, ${random(255)}, ${random(255)} )`;
    return color;
}

div.addEventListener("click", (e) => {
    e.target.style.backgroundColor = randomColorGenerator();
})