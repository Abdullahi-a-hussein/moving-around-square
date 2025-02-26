const canvas = document.getElementById("canvas");
const width = 600;
const height = 600;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");
let squares = [];
const totalSquares = 40;
const squareSize = 10;
const gap = 5;

function lerp(A, B, t) {
  return A + (B - A) * t;
}

function drawSquares() {
  ctx.strokeStyle = "green";
  const newSquares = [];
  for (let i = 0; i < totalSquares; i++) {
    for (let j = 0; j < totalSquares; j++) {
      const x = i * (squareSize + gap);
      const y = j * (squareSize + gap);
      const square = new Square(x, y, squareSize);
      newSquares.push(square);
      square.draw(ctx);
    }
  }
  return newSquares;
}

class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  }
  drawPont(ctx, t, j, round) {
    let point;
    if (t > 0 && round === 0) {
      point = {
        x: lerp(this.x, this.x + this.size, t),
        y: this.y,
      };
    } else if (t > 0 && round == 1) {
      point = {
        x: lerp(this.x + this.size, this.x, t),
        y: this.y + this.size,
      };
    } else if (t <= 0 && round == 0) {
      point = {
        x: this.x,
        y: lerp(this.y + this.size, this.y, j),
      };
    } else if (t <= 0 && round == 1) {
      point = {
        x: this.x + this.size,
        y: lerp(this.y, this.y + this.size, j),
      };
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
let j = 1;
let t = 1;
let round = 0;
let increment = 0.1;

function animate() {
  ctx.clearRect(0, 0, width, height);
  squares = drawSquares();
  if (round == 0) {
    if (t > 0 && j == 1) {
      t -= increment;
    } else if (t <= 0 && j > 0) {
      j -= increment;
    } else if (t <= 0 && j <= 0) {
      j = 1;
      t = 1;
      round = 1;
    }
  } else if (round == 1) {
    if (t > 0 && j == 1) {
      t -= increment;
    } else if (t <= 0 && j > 0) {
      j -= increment;
    } else if (t <= 0 && j <= 0) {
      j = 1;
      t = 1;
      round = 0;
    }
  }
  ctx.fillStyle = "white";
  squares.forEach((square, index) => {
    square.drawPont(ctx, t, j, round);
  });
  requestAnimationFrame(animate);
}

animate();
