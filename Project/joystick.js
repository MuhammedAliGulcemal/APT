const joystcikCanvas = document.getElementById("joystick");
const joystickCtx = canvas.getContext("2d");

const ctxWidth = joystcikCanvas.width = 300;
const ctxHeight = joystcikCanvas.height = 150;

joystcikCanvas.addEventListener("mouseenter", function (event) {
    let x = event.offsetX;
    let y = event.offsetY
    console.log(x);
    console.log(y);
    if(x > ctxWidth / 2){
        goRight();
    }

});
