const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const canvasGame = document.getElementById("gameScreen");
const ctxGame = canvasGame.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
const CANVAS_GAME_WIDTH = canvasGame.width = 300;
const CANVAS_GAME_HEIGHT = canvasGame.height = 400;
const spriteWidth = 100;
const spriteHeight = 100;
const spriteSizeX = 70;
const spriteSizeY = 100;
const marginX = 20;
const marginY = 20;
const startX = 0;
const startY = 0;
const speed = 2;
var collected = false;
var finished = false;
ctx.font = "20px Arial"
let imgIndex = 0;
let x = startX;
let y = startY;
let gameFrame = 10;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/Project/Sprite/";
let imgArr = [];
let blockArr = [];
ctx.lineWidth = 10;
ctxGame.lineWidth = 10;
var objKey;
var objChest;
var elementBlock;
async function loadImages() {
    for (let i = 0; i < 5; i++) {
        image = new Image();
        getImage(i, image);
        imgArr.push(image);
    }
    elementBlock = {
        blockName: "block" + 0,
        xLoc: 300,
        yLoc: 100,
        blockWidth: 300,
        blockHeight: 100
    }
    blockArr.push(elementBlock);
    elementBlock = {
        blockName: "block" + 1,
        xLoc: 200,
        yLoc: 0,
        blockWidth: 100,
        blockHeight: 500
    }
    blockArr.push(elementBlock);
    elementBlock = {
        blockName: "block" + 2,
        xLoc: 0,
        yLoc: 100,
        blockWidth: 100,
        blockHeight: CANVAS_HEIGHT
    }
    blockArr.push(elementBlock);
    elementBlock = {
        blockName: "block" + 3,
        xLoc: 300,
        yLoc: 400,
        blockWidth: 200,
        blockHeight: 100
    }
    blockArr.push(elementBlock);
    elementBlock = {
        blockName: "block" + 4,
        xLoc: 600,
        yLoc: 100,
        blockWidth: 100,
        blockHeight: 400
    }
    blockArr.push(elementBlock);
    elementBlock = {
        blockName: "door" + 0,
        xLoc: 500,
        yLoc: 400,
        blockWidth: 100,
        blockHeight: 100
    }
    blockArr.push(elementBlock);
    objKey = {
        keyName: "key" + 0,
        xLoc: 343,
        yLoc: 38,
        keyWidth: 30,
        keyHeight: 30
    }
    objChest = {
        chestName: "chest" + 0,
        xLoc: 340,
        yLoc: 230,
        chestWidth: 70,
        chestHeight: 35
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
            interract();
        }
    }, false);

}
function interract(){
    if (!collected) {
        collectKey();
    } else {
        collectChest();
    }
}
function goRight() {
    if (collisionControl() != 1) {
        x += speed;
        if (x > CANVAS_WIDTH - 30) {
            x = CANVAS_WIDTH - 30;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }
}
function goLeft() {
    if (collisionControl() != 1) {
        x -= speed;
        if (x < 0) {
            x = 0;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }
}
function goUp() {
    if (collisionControl() != 1) {
        y -= speed;
        if (y < 0) {
            y = 0;
        }
        imgIndex = ++imgIndex % 5;
        restartCanvas();
    }

}
function goDown() {
    if (collisionControl() != 1) {
        y += speed;
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
function collectChest() {
    if (collected) {
        if (x + spriteSizeX >= objChest.xLoc && x <= objChest.xLoc + objChest.chestWidth - marginX
            && y <= objChest.yLoc + objChest.chestHeight - marginY && y + spriteSizeY >= objChest.yLoc) {
            finished = true;
            alert("game ended");
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
                x -= speed;

            }
            if (x == blockArr[i].xLoc + blockArr[i].blockWidth - marginX) {
                x += speed;

            }
            if (y + spriteSizeY == blockArr[i].yLoc || y + spriteSizeY == blockArr[i].yLoc + speed) {
                y -= speed;

            }
            if (y == blockArr[i].yLoc + blockArr[i].blockHeight - marginY || y == blockArr[i].yLoc + blockArr[i].blockHeight - marginY + speed) {
                y += speed;

            }
            return 1;
        }
    }
}
function loadBlocks() {
    if (!collected) {
        for (let i = 0; i < blockArr.length; i++) {
            ctx.strokeRect(blockArr[i].xLoc, blockArr[i].yLoc, blockArr[i].blockWidth, blockArr[i].blockHeight);
            //ctx.fillText(blockArr[i].linkName, blockArr[i].xLoc + 20, blockArr[i].yLoc);
        }
        ctx.strokeRect(objKey.xLoc, objKey.yLoc, objKey.keyWidth, objKey.keyHeight);
    } else {
        for (let i = 0; i < blockArr.length; i++) {
            if (blockArr[i].blockName != "door0") {
                ctx.strokeRect(blockArr[i].xLoc, blockArr[i].yLoc, blockArr[i].blockWidth, blockArr[i].blockHeight);
            }
            //ctx.fillText(blockArr[i].linkName, blockArr[i].xLoc + 20, blockArr[i].yLoc);
        }
    }
    ctx.strokeRect(objChest.xLoc, objChest.yLoc, objChest.chestWidth, objChest.chestHeight);

}
function restartCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    loadBlocks();
    ctxGame.clearRect(0, 0, CANVAS_GAME_WIDTH, CANVAS_GAME_HEIGHT);
    ctxGame.strokeRect(0, 0, CANVAS_GAME_WIDTH, CANVAS_GAME_HEIGHT);
    ctxGame.drawImage(canvas,x - spriteSizeX,y-spriteSizeY +marginY + 20,CANVAS_WIDTH,CANVAS_HEIGHT,0,0,1000,1000);
    
}
async function init() {
    await loadImages();
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    restartCanvas();
    loadBlocks();
    myKeyPress();
}
init();