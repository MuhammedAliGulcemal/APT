const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 100;
const spriteHeight = 100;
let imgIndex = 0;
let x = 0;
let y = 5;
let start = true;
let pause = false;
let stop = false;
let gameFrame = 0;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/HW/HW3/Sprite/";
let imgArr = [];
async function loadImages() {
    for (let i = 0; i < 5; i++) {
        image = new Image();
        getImage(i, image);
        console.log(i);
        imgArr.push(image);
    }
}
async function getImage(i, image) {
    fetch(mainUrl + i + ".png").then(function (response) {
        return response.blob();
    }).then(function (blob) {
        console.log(blob);
        return image.src = URL.createObjectURL(blob);
    })
}
function getAnimation() {
    if (gameFrame % 5 == 0) {
        imgIndex = ++imgIndex % 5;
        x += 2;
        if (x > 300) {
            x = 0;
        }
    }
    

}
function animate() {
    if (!pause && !this.stop) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        getAnimation();
        ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
        gameFrame++;
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
        animate();
    } else {
        pause = true;
        buttonControl();
    }
}
function stopAnimation() {
    if (this.stop) {
        this.stop = false;
        buttonControl();
        animate();
    } else {
        this.stop = true;
        buttonControl();
    }
}
function nextAnimation() {
    x += 2;
    if (x > 300) {
        x = 0;
    }
    imgIndex = ++imgIndex % 5;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
}
function prevAnimation() {
    x -= 2;
    if (x < 0) {
        x = 0;
    }
    imgIndex = ++imgIndex % 5;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
}
async function init() {
    await loadImages();
    animate();
}
init();