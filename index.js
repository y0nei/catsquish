let catsquish = document.getElementById("catsquish")
let catsquishBgColor = catsquish.style.backgroundColor;

catsquish.addEventListener('click', () => {
    catsquish.style.backgroundColor = 'blue';
    console.log("🐱");

    setTimeout(() => {
        catsquish.style.backgroundColor = catsquishBgColor;
    }, 150);
});
