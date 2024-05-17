class Player {
  constructor(gameScreen, left, top, width, height) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.bulletsArr = [];
    this.speed = 0;
    this.angle = 0;
    this.size = 0; // Size of the bullet
    this.sprite = ""; // URL or path to the bullet sprite
    this.damage = 0; // Damage dealt by the bullet
    this.element = document.createElement("img");
    this.element.src = "playersprite.png";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
    this.shootingInterval = null; // Interval for continuous shooting
    this.isShooting = false; // Flag to track shooting state

    document.addEventListener("keydown", (e) => this.keydown(e));
    document.addEventListener("keyup", (e) => this.keyup(e));
  }

  keydown(e) {
    console.log(this.bulletsArr);
    if (e.key === " ") {
      // Spacebar key\
      this.shootProjectilePlayer();
      if (!this.isShooting) {
        // Start shooting only if not already shooting
        // this.isShooting = true;
        // this.shootingInterval = setInterval(this.shootProjectilePlayer(), 100); // Adjust interval as needed
      }
    }
  }
  keyup(e) {
    if (e.key === " ") {
      // Spacebar key
      // Stop shooting when spacebar is released
      this.isShooting = false;
      clearInterval(this.shootingInterval);
    }
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left <= 10) {
      this.left = 10;
      // this.directionX *= -0.5;
    }

    if (this.top <= 10) {
      this.top = 10;
      //this.directionY *= -0.5;
    }

    if (this.left >= this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
      //this.directionX *= -0.5;
    }

    if (this.top >= this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
      // this.directionY *= -0.5;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  shootProjectilePlayer() {
    console.log("shoot projectile func");
    const centerX = this.left + this.width / 2;
    const centerY = this.top + this.height / 2;
    let direction = -2;

    const angleToTarget = Math.PI / direction; // 90 degrees in radians
    // Example bullet properties
    const bulletSpeed = 6;
    const bulletSize = 20;
    const bulletSprite = "./bulletofplayer.png";
    const bulletDamage = 1;

    const playerBullet = new PlayerBullet(
      this.gameScreen,
      centerX,
      centerY,
      bulletSpeed,
      angleToTarget,
      bulletSize,
      bulletSprite,
      bulletDamage
    );
    this.bulletsArr.push(playerBullet);
    // Add the projectile to the array or container
    this.gameScreen.appendChild(playerBullet.element);
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      console.log("Colliding");
      return true;
    } else {
      return false;
    }
  }
}
