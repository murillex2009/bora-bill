# bora-bill
let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let cols = floor(width / rez);
  let rows = floor(height / rez);
  food = createVector(floor(random(cols)), floor(random(rows)));
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      if (snake.dir.x === 0) snake.setDir(-1, 0);
      break;
    case RIGHT_ARROW:
      if (snake.dir.x === 0) snake.setDir(1, 0);
      break;
    case DOWN_ARROW:
      if (snake.dir.y === 0) snake.setDir(0, 1);
      break;
    case UP_ARROW:
      if (snake.dir.y === 0) snake.setDir(0, -1);
      break;
  }
}

function draw() {
  scale(rez);
  background(220);

  snake.update();
  snake.show();
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);

  if (snake.eat(food)) {
    foodLocation();
  }

  if (snake.endGame()) {
    print("GAME OVER");
    noLoop(); // Para o jogo
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.dir = createVector(0, 0);
    this.grow = false;
  }

  setDir(x, y) {
    this.dir.set(x, y);
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    this.body.shift();
    head.add(this.dir);
    this.body.push(head);

    if (this.grow) {
      this.body.unshift(createVector(-1, -1));
      this.grow = false;
    }
  }

  grow() {
    this.grow = true;
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    if (head.x > w - 1 || head.x < 0 || head.y > h - 1 || head.y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    noStroke();
    fill(0);
    for (let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
