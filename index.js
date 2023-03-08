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

window.addEventListener("load", () => {
    reset(catsquish);
    pause(catsquish);
});

catsquish_container.addEventListener('click', () => {
    reset(catsquish);
    counter++;
    counterEl[0].innerText = counter;
});
