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

let maxAudioPlaying = 10;
let boingSound = "boing.mp3";
let squishSound = "squish.mp3";
let playingAudio = [];

function playAudio() {
    if (playingAudio.length < maxAudioPlaying) {
        let audio;
        let rand = Math.random();
        if (rand < 0.75) {
            audio = new Audio(boingSound);
        } else {
            audio = new Audio(squishSound);
        }
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

const removeTime = 1000; // remove element after X time
const fadeDelay = 300; // delay for triggering the fade out

// mouse event on container
catsquish_container.addEventListener('mousedown', (e) => {
    reset(catsquish);
    // Delay for better reapeatability
    catsquish.style.animationDelay = "-100ms";

    playAudio();
    playBounce();
    counter++;
    squishcounter[0].innerText = counter;

    // +1 squish under cursor
    const boxElement = document.createElement('div');
    boxElement.classList.add("clicktext");
    boxElement.style.top = `${e.clientY - 25}px`;
    boxElement.style.left = `${e.clientX - 25}px`;

    // Create a new text node containing the string "+1"
    const textNode = document.createTextNode('+1');
    boxElement.appendChild(textNode);

    document.body.appendChild(boxElement);

    // Fade out and remove the element after the specified time
    setTimeout(() => {
        boxElement.classList.add('fade-out');
        setTimeout(() => {
            boxElement.parentNode.removeChild(boxElement);
        }, removeTime);
    }, fadeDelay);
});
