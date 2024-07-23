const canvas = document.querySelector(".canvas-ball");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = "300");

const luckyBallNumField = document.querySelector(".p-ball-num");

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

function Shape(x, y) {
  this.x = x;
  this.y = y;
}

function Ball(x, y, velX, velY, color, size) {
  Shape.call(this, x, y);
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.exist = true;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exist&&(this !== balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

function EvilCircle(x, y) {
  Shape.call(this, x, y);
  this.color = "black";
  this.size = 20;
}

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.control = function () {
  for (let j = 0; j < balls.length; j++) {
    const dx = this.x - balls[j].x;
    const dy = this.y - balls[j].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (balls[j].exist&&(distance < this.size + balls[j].size)) {
      balls[j].exist = false;
      luckyBallNum--;
      luckyBallNumField.textContent = "剩余幸运小球数量为： " + String(luckyBallNum);
    }
  }
};

let luckyBallNum = 25;
let balls = [];
while (balls.length < luckyBallNum) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  if (ball.velX === 0 && ball.velY === 0) {
    ball.velX = 2;
  }
  balls.push(ball);
}

let circle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = "#fff"; //"rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  circle.draw();

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exist) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  circle.control();


  requestAnimationFrame(loop);
}

loop();
