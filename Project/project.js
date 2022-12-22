const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 975;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 100;
const spriteHeight = 100;
const spriteSizeX = 70;
const spriteSizeY = 100;
const marginX = 20;
const marginY = 20;
var collected = false;
ctx.font = "20px Arial"
let imgIndex = 0;
let x = 0;
let y = 0;
let gameFrame = 10;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/HW/HW3/Sprite/";
let imgArr = [];
let blockArr = [];
ctx.lineWidth = 10;
var objKey;
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
    objKey = {
        keyName: "key",
        xLoc: 340,
        yLoc: 420,
        keyWidth: 30,
        keyHeight: 30
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
            if (!collected) {
                collectKey();

            }

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
        restartCanvas();
    }
}
function goLeft() {
    if (collisionControl() != 1) {
        x -= 2;
        if (x < 0) {
            x = 0;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }
}
function goUp() {
    if (collisionControl() != 1) {
        y -= 2;
        if (y < 0) {
            y = 0;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }

}
function goDown() {
    if (collisionControl() != 1) {
        y += 2;
        if (y > CANVAS_HEIGHT - spriteHeight) {
            y = CANVAS_HEIGHT - spriteHeight;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }
}
function collectKey() {
    if (!collected) {
        if (x + spriteSizeX >= objKey.xLoc && x <= objKey.xLoc + objKey.keyWidth - marginX
            && y <= objKey.yLoc + objKey.keyHeight - marginY && y + spriteSizeY >= objKey.yLoc) {
            collected = true;
        }
    }
    restartCanvas();
}
function collisionControl() {
    for (let i = 0; i < blockArr.length; i++) {
        console.log(blockArr.length);
        console.log(i);
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
            && x <= blockArr[i].xLoc + blockArr[i].blockWidth - marginX)
            &&
            ((y + spriteSizeY >= blockArr[i].yLoc
                && y <= blockArr[i].yLoc + blockArr[i].blockHeight - marginY)
            )) {
            console.log("collision");
            if (x + spriteSizeX == blockArr[i].xLoc) {
                x -= 2;

            }
            if (x == blockArr[i].xLoc + blockArr[i].blockWidth - marginX) {
                x += 2;

            }
            if (y + spriteSizeY == blockArr[i].yLoc || y + spriteSizeY == blockArr[i].yLoc + 2) {
                y -= 2;

            }
            if (y == blockArr[i].yLoc + blockArr[i].blockHeight - marginY || y == blockArr[i].yLoc + blockArr[i].blockHeight - marginY + 2) {
                y += 2;

            }
            return 1;
        }
    }
}
function loadBlocks() {
    for (let i = 0; i < blockArr.length; i++) {
        ctx.strokeRect(blockArr[i].xLoc, blockArr[i].yLoc, blockArr[i].blockWidth, blockArr[i].blockHeight);
        //ctx.fillText(blockArr[i].linkName, blockArr[i].xLoc + 20, blockArr[i].yLoc);
    }
    if (!collected) {
        ctx.strokeRect(objKey.xLoc, objKey.yLoc, objKey.keyWidth, objKey.keyHeight);
    }

}
function restartCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    loadBlocks();
}
async function init() {
    await loadImages();
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    loadBlocks();
    myKeyPress();
}
init();