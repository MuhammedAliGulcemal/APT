const canvas = document.getElementById("layout");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 975;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 100;
const spriteHeight = 100;
ctx.font = "20px Arial"
let imgIndex = 0;
let x = 0;
let y = 5;
let start = true;
let pause = false;
let stop = false;
let gameFrame = 0;
const mainUrl = "https://muhammedaligulcemal.github.io/APT/HW/HW3/Sprite/";
let imgArr = [];
let linkArr = [];

async function loadImages() {
    for (let i = 0; i < 5; i++) {
        image = new Image();
        getImage(i, image);
        imgArr.push(image);
    }
    for (let i = 0; i < 10; i++) {
        let elementLink = {
            linkName: "CW" + i,
            xLoc: i * 100,
            yLoc: 60
        }
        linkArr.push(elementLink);
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
        if (keyName == " ") {
            for (let i = 0; i < linkArr.length; i++) {
                console.log(x);
                //console.log(linkArr[i].xLoc);
                //console.log(linkArr[i].xLoc + ctx.measureText(linkArr[i].linkName).width);
                if (x >= linkArr[i].xLoc - 30 && x < linkArr[i].xLoc + ctx.measureText(linkArr[i].linkName).width - 20) {
                    if(linkArr[i].linkName == "CW3"){
                        location.href = "https://blm305.github.io/2022/work/Inspector";
                    }else{
                        console.log(linkArr[i].linkName);
                        location.href = "https://muhammedaligulcemal.github.io/APT/CW/" + linkArr[i].linkName + ".html";
                    }
                   
                }
            }
        }
    }, false);

}
function goRight() {
    x += 2;
    if (x > CANVAS_WIDTH - 30) {
        x = 0;
    }
    imgIndex = ++imgIndex % 5;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
    loadLinks();
}
function goLeft() {
    x -= 2;
    if (x < 0) {
        x = CANVAS_WIDTH - 30;
    }
    imgIndex = ++imgIndex % 5;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(imgArr[imgIndex], x, y, spriteWidth, spriteHeight);
    loadLinks();
}
function loadLinks() {
    for (let i = 0; i < linkArr.length; i++) {
        ctx.fillText(linkArr[i].linkName, linkArr[i].xLoc + 20, linkArr[i].yLoc);
    }
}
async function init() {
    await loadImages();
    loadLinks();
    myKeyPress();
}
init();