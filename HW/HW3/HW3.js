const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 200;
const spriteHeight = 200;
let imgIndex = 0;
let x = 0;
let y = 5;
let start = true;
let pause = false;
let stop = false;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/HW/HW3/Sprite/";
let imgArr = [];
async function loadImages() {
    for (let i = 0; i < 5; i++) {
        image = new Image();
        image.src = await getImage(i, image);
        imgArr.push(image);
    }
}
async function getImage(i, image) {
    fetch(mainUrl + i + ".png").then(function (response) {
        return response.blob();
    }).then(function (blob) {
        console.log(blob);
        return URL.createObjectURL(blob);
    })
}
function getAnimation() {
    imgIndex = ++imgIndex % 5;
    x += 5;
    if (x > 100) {
        x = 0;
    }
}
function animate() {
    if (!pause && !this.stop) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        getAnimation();
        ctx.drawImage(imgArr[index], x, y, spriteWidth, spriteHeight);
        requestAnimationFrame(animate);
    }
}
function buttonControl() {
    if (pause || this.stop) {
        document.getElementById("next").disabled = false;
        document.getElementById("prev").disabled = false;
    } else {
        document.getElementById("next").disabled = true;
        document.getElementById("prev").disabled = true;
    }
}
function startAnimation() {
    if (this.start) {
        pause = false;
        this.stop = false;
        index = 0;
        x = 0;
        buttonControl();
        animate();
    }
}
function pauseAnimation() {
    if (pause) {
        pause = false;
        buttonControl();
    } else {
        pause = true;
        buttonControl();
        animate();
    }
}
function stopAnimation() {
    if (this.stop) {
        this.stop = false;
        buttonControl();
    } else {
        this.stop = true;
        buttonControl();
        animate();
    }
}
function nextAnimation() {
    x += 5;
    if (x > 100) {
        x = 0;
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[index], x, y, spriteWidth, spriteHeight);
}
function prevAnimation() {
    x -= 5;
    if (x < 0) {
        x = 0;
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[index], x, y, spriteWidth, spriteHeight);
}
async function init() {
    await loadImages();
    animate();
}

init();
