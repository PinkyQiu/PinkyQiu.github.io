window.onload = function() {
    var rand = (min, max) => parseInt(Math.random() * (max - min) + min)
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    class Ball {
        constructor(ctx) {
            this.ctx = ctx;
            this.setSize();
            this.color = `rgb(${rand(1,256)},${rand(1,256)},${rand(1,256)})`
            var r = rand(5, 20);
            this.r = r
            const canvasWidth = myCanvas.width;
            const canvasHeight = myCanvas.height;
            this.x = rand(r, canvasWidth - r);
            this.y = rand(r, canvasHeight - r);
            this.maxWidth = canvasWidth - r;
            this.maxHeight = canvasHeight - r;
            var speedX = rand(1, 3);
            this.speedX = rand(0, 100) > 50 ? speedX : -speedX;
            var speedY = rand(1, 3);
            this.speedY = rand(0, 100) > 50 ? speedY : -speedY;
            window.onresize = () => {
                this.setSize()
            }
        }
        setSize() {
            this.ctx.canvas.width = window.innerWidth;
            this.ctx.canvas.height = window.innerHeight;
        }
        draw() {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
        move() {
            this.x += this.speedX;
            if (this.x >= this.maxWidth) {
                this.speedX *= -1;
            } else if (this.x < this.r) {
                this.speedX *= -1;
            }
            this.y += this.speedY;
            if (this.y >= this.maxHeight) {
                this.speedY *= -1;
            } else if (this.y < this.r) {
                this.speedY *= -1;
            }
        }
    }
    var balls = [];
    for (var i = 0; i < 50; i++) {
        balls.push(new Ball(ctx));
    };

    setInterval(function() {
        ctx.clearRect(0, 0, 2000, 1000);
        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].move();
        };
    }, 40)
}
