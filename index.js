let catsquish_container = document.getElementById("catsquish-container");
let catsquish = document.getElementById("catsquish");
let counterEl = document.querySelectorAll("#squishcount > p");
let stillframe = "./src/still_frame.png";
var counter = 0;

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

let animElements = document.querySelectorAll(".anim-container");

function playBounce() {
    let notRunning = Array.from(animElements).filter(el => el.style.animationPlayState !== "running");

    if (notRunning.length > 0) {
        let nextAnimElement = notRunning[0];
        reset(nextAnimElement);
        play(nextAnimElement);
        nextAnimElement.addEventListener("animationend", () => {
            pause(nextAnimElement);
        }, {once: true});
    }
}

window.addEventListener("load", () => {
    reset(catsquish);
    pause(catsquish);
});

catsquish_container.addEventListener('click', () => {
    reset(catsquish);
    playAudio();
    playBounce();
    counter++;
    counterEl[0].innerText = counter;
});
