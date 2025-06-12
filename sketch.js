let player;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(400, 600);
  player = new Player();
}

function draw() {
  background(50);

  player.show();
  player.move();

  // Obstáculos aparecem mais frequentemente (a cada 45 frames)
  if (frameCount % 45 === 0) {
    obstacles.push(new Obstacle());
    score++;
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].hits(player)) {
      noLoop();
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER);
      text("Game Over", width / 2, height / 2);
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  fill(255);
  textSize(18);
  text("Score: " + score, 10, 20);
}

class Player {
  constructor() {
    this.w = 40;
    this.h = 40;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 7; // mais rápido
  }

  show() {
    fill(0, 200, 255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.w);
  }
}

class Obstacle {
  constructor() {
    this.w = random(30, 80);
    this.h = 20;
    this.x = random(0, width - this.w);
    this.y = 0;
    this.speed = 7; // mais rápido
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 100, 100);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(player) {
    return (
      player.x < this.x + this.w &&
      player.x + player.w > this.x &&
      player.y < this.y + this.h &&
      player.y + player.h > this.y
    );
  }

  offscreen() {
    return this.y > height;
  }
}
