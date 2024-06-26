class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen, 108, 175, 33, 75, "craft2.png");
    this.height = 800;
    this.width = 600;
    this.obstacles = [];

    this.score = 0;
    this.lives = 3;
    this.health = 50;
    this.timer = 30;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.frames = 0;
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.stats = document.getElementById("stats-container");
    this.clockContainer = document.getElementById("clock-container");
    this.clock = document.getElementById("clock");
    this.endMessage = document.getElementById("end-message");
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.startScreen.style.padding = 0;
    this.startScreen.style.height = 0;

    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.frames += 1;
    if (this.obstacles.length < 1) {
      if (this.frames % 120 === 0) {
        this.obstacles.push(new Enemy(this.gameScreen));
        console.log(this.obstacles);
      }
    }

    this.update();

    if (this.lives <= 0) {
      console.log("Lives====>", this.lives);
      this.gameIsOver = true;
    }

    if (this.frames % 60 === 0) {
      this.timer--;
      this.clock.innerHTML = this.timer;
    }

    if (this.timer <= 0) {
      this.gameIsOver = true;
    }

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
      this.gameOverScreen();
    }

    // Update enemies and bullet and check of both collisions
    this.obstacles.forEach((obstacle, i) => {
      obstacle.move();

      obstacle.bulletsArr.forEach((bullet, x) => {
        if (bullet.bulletCollide(this.player)) {
          obstacle.bulletsArr.splice(x, 1);
          bullet.createExplosion();
          bullet.element.remove();

          if (this.lives) {
            this.lives--;
          } else {
            this.gameOverScreen();
          }
        }
      });
      // Check collision with player's hurtbox
      if (
        this.player.left < obstacle.left + obstacle.width &&
        this.player.left + this.player.width > obstacle.left &&
        this.player.top < obstacle.top + obstacle.height &&
        this.player.top + this.player.height > obstacle.top
      ) {
        obstacle.createExplosion();
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives -= 1;
      }

      this.player.bulletsArr.forEach((bullet, j) => {
        bullet.update();
        if (bullet.didCollide(obstacle)) {
          this.player.bulletsArr.splice(j, 1);
          this.obstacles.splice(i, 1);
          bullet.element.remove();
          obstacle.element.remove();
          this.score++;
          obstacle.createExplosion();
        }
        if (bullet.y < -20) {
          this.player.bulletsArr.splice(i, 1);
        }
      });

      // Shoot projectile from enemy
      if (this.frames % 15 === 0) {
        // Adjust this timing according to your game's needs
        obstacle.shootProjectile();
      }
      // Shoot projectile from enemy
      if (this.frames % 15 === 0) {
        // Adjust this timing according to your game's needs
        obstacle.shootProjectile2();
      }
      if (this.frames % 90 === 0) {
        // Adjust this timing according to your game's needs
        obstacle.shootProjectile3();
      }
    });
  }

  update() {
    this.player.move();

    this.scoreElement.innerHTML = this.score;
    this.livesElement.innerHTML = this.lives;
  }

  returnLivesMessage() {
    return this.lives;
  }

  gameOverScreen() {
    console.log("Game over");
    this.player.element.remove();

    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

    this.gameScreen.style.height = `${0}px`;
    this.gameScreen.style.width = `${0}px`;
    this.gameScreen.style.display = "none";
    console.log("Game end screen", this.stats);

    this.gameEndScreen.style.display = "inherit";
    if (this.timer <= 0) {
      this.endMessage.innerText = `You won! You finished with a score of ${
        this.score
      } and ${this.returnLivesMessage()}!`;
    } else {
      this.endMessage.innerText = `You lost!  You ran out of lives and finished with a score of ${this.score}.`;
    }
  }
}
