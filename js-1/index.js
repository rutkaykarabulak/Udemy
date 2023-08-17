const randomNumber = Math.floor(Math.random() * 101);;

let numberOfGuess = 10;

const button = document.getElementById("button");
const restart = document.getElementById("restart");
const input = document.getElementById("input");
const p = document.getElementById("guess");
const previousGuess = document.getElementById("previous");
function check() {
    if (numberOfGuess > 0) {
        const value = input.value;
        if (Number(value) === randomNumber) {
            alert("Congrats!!");
        }
        numberOfGuess--;
        p.textContent = "Number of guess: " + numberOfGuess;
    } else {
        button.disabled = true;
    }
}


button.addEventListener("click", check);
restart.addEventListener("click", reset);
