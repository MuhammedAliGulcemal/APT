const canvas = document.getElementById("layout");
        const ctx = canvas.getContext("2d");
        const CANVAS_WIDTH = canvas.width = 600;
        const CANVAS_HEIGHT = canvas.height = 600;
        const spriteWidth = 200;
        const spriteHeight = 200;
        let frameX = 0;
        let frameY = 5;
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
            fetch("Sprite/" + i + ".png").then(function (response) {
                return response.blob();
            }).then(function (blob) {
                console.log(blob);
                return URL.createObjectURL(blob);
            })
        }
        loadImages();
        let animationFrame = 0;
        const frameTime = 10;
        function animate() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(imgArr[frameX],frameX,frameY,spriteWidth,spriteHeight);
            if (animationFrame % frameTime == 0) {
                if (frameX < 4) {
                    frameX++;
                } else {
                    frameX = 0;
                }
            }
            animationFrame++;
            requestAnimationFrame(animate);
        }
        animate();