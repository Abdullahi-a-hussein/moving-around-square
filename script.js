const canvas = document.getElementById("canvas");
const width = 700;
const height = 700;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");
let squares = [];
const totalSquares = 80;
const squareSize = 20;
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
    }
  }
  return newSquares;
}

class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.t = 0;
    this.j = 0;
    this.round = 1;
    this.increment = 0.05;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  }
  drawPont(ctx) {
    let point;
    if (this.t > 0 && this.round === 0) {
      point = {
        x: lerp(this.x, this.x + this.size, this.t),
        y: this.y,
      };
    } else if (this.t > 0 && this.round == 1) {
      point = {
        x: lerp(this.x + this.size, this.x, this.t),
        y: this.y + this.size,
      };
    } else if (this.t <= 0 && this.round == 0) {
      point = {
        x: this.x,
        y: lerp(this.y + this.size, this.y, this.j),
      };
    } else if (this.t <= 0 && this.round == 1) {
      point = {
        x: this.x + this.size,
        y: lerp(this.y, this.y + this.size, this.j),
      };
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    if (this.round == 0) {
      if (this.t > 0) {
        this.t -= this.increment;
      } else if (this.j > 0) {
        this.j -= this.increment;
      } else {
        this.j = 1;
        this.t = 1;
        this.round = 1;
      }
    } else {
      if (this.t > 0) {
        this.t -= this.increment;
      } else if (this.j > 0) {
        this.j -= this.increment;
      } else {
        this.j = 1;
        this.t = 1;
        this.round = 0;
      }
    }
  }
}

squares = drawSquares();
const ln = squares.length;
squares.forEach((square, index) => {
  // if (index % 2 == 0) {
  square.t = Math.abs(Math.sin(index) + Math.cos(index));
  square.j = Math.abs(Math.cos(index) + Math.sin(index));
  // } else {
  // square.t = Math.abs(Math.sin(ln - index));
  // square.j = Math.abs(Math.sin(ln - index));
  // }
});
function animate() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "white";
  squares.forEach((square, index) => {
    // square.draw(ctx);
    square.drawPont(ctx);
  });

  squares.forEach((square) => square.update());
  requestAnimationFrame(animate);
}

animate();
