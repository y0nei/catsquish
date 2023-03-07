let catsquish = document.getElementById("catsquish")
let catsquishimg = document.getElementById("catimg")
let stillframe = "./src/catsquish.png"
let animation = "./src/catsquish-single-cropped-gif.gif"
let running = false

catsquish.addEventListener('click', () => {
    if (running) {
        return;
    }
    catsquishimg.src = animation
    running = true
    catsquish.style.backgroundColor = "red"
    setTimeout(() => {
        if (running) {
            catsquishimg.src = stillframe
            running = false
            catsquish.style.backgroundColor = "blue"
        }
    }, 1500);
});
