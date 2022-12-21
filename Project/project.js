const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 975;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 100;
const spriteHeight = 100;
const spriteSizeX = 70;
const spriteSizeY = 100;
ctx.font = "20px Arial"
let imgIndex = 0;
let x = 0;
let y = 0;
let start = true;
let pause = false;
let stop = false;
let gameFrame = 0;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/HW/HW3/Sprite/";
let imgArr = [];
let blockArr = [];
ctx.lineWidth = 10;
async function loadImages() {
    for (let i = 0; i < 5; i++) {
        image = new Image();
        getImage(i, image);
        imgArr.push(image);
    }
    for (let i = 0; i < 5; i++) {
        let elementBlock = {
            blockName: "block" + i,
            xLoc: i * 100 + 200,
            yLoc: i * 100 + 200,
            blockWidth: 100,
            blockHeight: 100
        }
        blockArr.push(elementBlock);
    }
}
async function getImage(i, image) {
    fetch(mainUrl + i + ".png").then(function (response) {
        return response.blob();
    }).then(function (blob) {
        return image.src = URL.createObjectURL(blob);
    })
}
function myKeyPress() {
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        //kb.innerText = keyName;
        if (keyName == "d") {
            goRight();
        }
        if (keyName == "a") {
            goLeft();
        }
        if (keyName == "w") {
            goUp();
        }
        if (keyName == "s") {
            goDown();
        }
        if (keyName == " ") {

        }
    }, false);

}
function goRight() {
    if (collisionControl() != 1) {
        x += 2;
        if (x > CANVAS_WIDTH - 30) {
            x = CANVAS_WIDTH - 30;
        }
        imgIndex = ++imgIndex % 5;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        loadBlocks();
    }
}
function goLeft() {
    if (collisionControl() != 1) {
        x -= 2;
        if (x < 0) {
            x = 0;
        }
        imgIndex = ++imgIndex % 5;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        loadBlocks();
    }
}
function goUp() {
    if (collisionControl() != 1) {
        y -= 2;
        if (y < 0) {
            y = 0;
        }
        imgIndex = ++imgIndex % 5;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        loadBlocks();
    }
    else{
        y+=2;
    }
}
function goDown() {
    if (collisionControl() != 1) {
        y += 2;
        if (y > CANVAS_HEIGHT - spriteHeight) {
            y = CANVAS_HEIGHT - spriteHeight;
        }
        imgIndex = ++imgIndex % 5;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        loadBlocks();
    }
    else{
        y-=2;
    }
}
function collisionControl() {
    for (let i = 0; i < blockArr.length; i++) {
        console.log("x: " + x);
        console.log("y: " + y);
        console.log("Matematik1:" + (y + spriteHeight));
        console.log("Matematik2:" + (blockArr[i].yLoc + blockArr[i].blockHeight));
        console.log(x + spriteSizeX >= blockArr[i].xLoc);
        console.log(x <= blockArr[i].xLoc + blockArr[i].blockWidth);
        console.log(y + spriteSizeY >= blockArr[i].yLoc);
        console.log(y <= blockArr[i].yLoc + blockArr[i].blockHeight);
        //console.log(linkArr[i].xLoc);
        console.log(blockArr[i].xLoc + blockArr[i].blockWidth);
        if ((x + spriteSizeX >= blockArr[i].xLoc
            && x <= blockArr[i].xLoc + blockArr[i].blockWidth)
            &&
            ((y + spriteSizeY >= blockArr[i].yLoc
                && y <= blockArr[i].yLoc + blockArr[i].blockHeight)
            )) {
            console.log("collision");
            if (x + spriteSizeX == blockArr[i].xLoc) {
                x -=2;

            } if (x == blockArr[i].xLoc + blockArr[i].blockWidth) {
                x+=2;

            } 
            return 1;
        } else {
            return 0;
        }
    }
}
function loadBlocks() {
    for (let i = 0; i < blockArr.length; i++) {
        ctx.strokeRect(blockArr[i].xLoc, blockArr[i].yLoc, blockArr[i].blockWidth, blockArr[i].blockHeight);
        //ctx.fillText(blockArr[i].linkName, blockArr[i].xLoc + 20, blockArr[i].yLoc);
    }
}
async function init() {
    await loadImages();
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    loadBlocks();
    myKeyPress();
}
init();