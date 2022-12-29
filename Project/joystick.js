var canvasJoystick, ctxJoystick;

window.addEventListener('load', () => {

    canvasJoystick = document.getElementById('canvas');
    ctxJoystick = canvasJoystick.getContext('2d');
    resize();

    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mousemove', Draw);

    document.addEventListener('touchstart', startDrawing);
    document.addEventListener('touchend', stopDrawing);
    document.addEventListener('touchcancel', stopDrawing);
    document.addEventListener('touchmove', Draw);
    window.addEventListener('resize', resize);

});




var width, height, radius, x_orig, y_orig;
function resize() {
    width = 200;
    radius = 30;
    height = radius * 6.5 ;
    ctxJoystick.canvas.width = width;
    ctxJoystick.canvas.height = height;
    background();
    joystick(width / 2, height / 3);
}

function background() {
    x_orig = width / 2;
    y_orig = height / 3;
    ctxJoystick.beginPath();
    ctxJoystick.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
    ctxJoystick.fillStyle = '#ECE5E5';
    ctxJoystick.fill();
}

function joystick(width, height) {
    ctxJoystick.beginPath();
    ctxJoystick.arc(width, height, radius, 0, Math.PI * 2, true);
    ctxJoystick.fillStyle = '#ad4caf';
    ctxJoystick.fill();
    ctxJoystick.strokeStyle = '#dc62de';
    ctxJoystick.lineWidth = 8;
    ctxJoystick.stroke();
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    var mouse_x = event.clientX || event.touches[0].clientX;
    var mouse_y = event.clientY || event.touches[0].clientY;
    coord.x = mouse_x - canvasJoystick.offsetLeft;
    coord.y = mouse_y - canvasJoystick.offsetTop;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
    if (radius >= current_radius) return true
    else return false
}


function startDrawing(event) {
    paint = true;
    getPosition(event);
    if (is_it_in_the_circle()) {
        ctxJoystick.clearRect(0, 0, canvasJoystick.width, canvasJoystick.height);
        background();
        joystick(coord.x, coord.y);
        Draw();
    }
}


function stopDrawing() {
    paint = false;
    ctxJoystick.clearRect(0, 0, canvasJoystick.width, canvasJoystick.height);
    background();
    joystick(width / 2, height / 3);

}

function Draw(event) {

    if (paint) {
        ctxJoystick.clearRect(0, 0, canvasJoystick.width, canvasJoystick.height);
        background();
        var angle_in_degrees, x, y, speed;
        var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

        if (Math.sign(angle) == -1) {
            angle_in_degrees = Math.round(-angle * 180 / Math.PI);
        }
        else {
            angle_in_degrees = Math.round(360 - angle * 180 / Math.PI);
        }


        if (is_it_in_the_circle()) {
            joystick(coord.x, coord.y);
            x = coord.x;
            y = coord.y;
        }
        else {
            x = radius * Math.cos(angle) + x_orig;
            y = radius * Math.sin(angle) + y_orig;
            joystick(x, y);
        }


        getPosition(event);

        var speed = Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

        var x_relative = Math.round(x - x_orig);
        var y_relative = Math.round(y - y_orig);
        if ((x_relative / y_relative > 1 || x_relative / y_relative < -1) && x_relative > 0) {
            goRight();
        }
        else if ((x_relative / y_relative > 1 || x_relative / y_relative < -1) && x_relative < 0) {
            goLeft();
        }
        else if ((0 < x_relative / y_relative < 1 || 0 > x_relative / y_relative > -1) && y_relative < 0) {
            goUp();
        }
        else if ((0 < x_relative / y_relative < 1 || 0 > x_relative / y_relative > -1) && y_relative > 0) {
            goDown();
        }

    }
} 