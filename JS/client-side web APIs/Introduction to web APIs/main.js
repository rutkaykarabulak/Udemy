let AudioContext;
let audioCtx;
let music;

const play = document.querySelector("#play");
const audioElement = document.querySelector("audio");
const volumeSlider = document.querySelector(".volume");

function initialize() {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    music = audioCtx.createMediaElementSource(audioElement);

    const gainNode = audioCtx.createGain();
    volumeSlider.addEventListener("input", () => {
        gainNode.gain.value = volumeSlider.value;
    });

  music.connect(gainNode).connect(audioCtx.destination);
}

play.addEventListener("click", () => {
    if (!audioCtx) {
        initialize();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    if (play.classList.contains("paused")) {
        audioElement.play();
        play.classList.remove("paused");
        play.classList.add("playing");
        play.textContent = "Pause";
    } else if (play.classList.contains("playing")) {
        audioElement.pause();
        play.classList.remove("playing");
        play.classList.add("paused");
        play.textContent = "Play";
    }
});

audioElement.addEventListener("ended", () => {
    play.classList.remove("playing");
    play.classList.add("paused");
    play.textContent = "Play";
});
