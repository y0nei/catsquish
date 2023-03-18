let catsquish_container = document.getElementById("catsquish-container");
let catsquish = document.getElementById("catsquish");
let squishcounter = document.querySelectorAll("#squishcount > p");
let stillframe = "./src/still_frame.png";
var counter = 0;

// Animation helpers

function play(el) {
    el.style.animationPlayState = 'running';
}
function pause(el) {
    el.style.animationPlayState = 'paused';
}
function reset(el) {
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow to apply the change immediately */
    el.style.animation = null;
}
function stop(el) {
    reset(el);
    pause(el);
}

// Audio controller (with overlapping)

let maxAudioPlaying = 10
let boingSound = "boing.mp3"
let playingAudio = [];

function playAudio() {
    if (playingAudio.length < maxAudioPlaying) {
        let audio = new Audio(boingSound);
        audio.volume = 1;
        playingAudio.push(audio);
        audio.play();
        audio.addEventListener('ended', function() {
            var index = playingAudio.indexOf(audio);
            if (index > -1) {
                playingAudio.splice(index, 1);
            }
        });
    }
}

// Bounce animation controller (with overalpping)

/*
* TODO: Still needs fixes, the animations do work properly
* but after a few cycles, it gets janky and the animations reset
*/

let animElements = document.querySelectorAll(".anim-container");

function playBounce() {
    let notRunning = Array.from(animElements).filter(el => el.style.animationPlayState !== "running");
    if (notRunning.length > 0) {
        let nextAnimElement = notRunning[0];
        reset(nextAnimElement);
        play(nextAnimElement);
        nextAnimElement.addEventListener("animationend", () => {
            stop(nextAnimElement);
        }, {once: true});
    }
}

// Disable any animations that would play on window load
window.addEventListener("load", () => {
    stop(catsquish);
    for (let i = 0; i < animElements.length; i++) {
        stop(animElements[i]);
    }
});

// mouse event on container
catsquish_container.addEventListener('mousedown', () => {
    reset(catsquish);
    // Delay for better reapeatability
    catsquish.style.animationDelay = "-100ms";

    playAudio();
    playBounce();
    counter++;
    squishcounter[0].innerText = counter;
});
