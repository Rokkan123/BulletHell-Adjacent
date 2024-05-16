class Enemy {
  constructor(gameScreen, speed, angle, size, sprite, damage) {
    this.gameScreen = gameScreen;
    this.left = 263;
    this.directionX = 0;
    this.top = -150;
    this.width = 63;
    this.height = 150;
    this.bulletsArr = [];
    this.health = 10;
    this.element = document.createElement("img");
    this.element.src = "playercraft.png";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.gameScreen = gameScreen;
    this.speed = speed;
    this.angle = angle;
    this.size = size; // Size of the bullet
    this.sprite = sprite; // URL or path to the bullet sprite
    this.damage = damage; // Damage dealt by the bullet
    this.gameScreen.appendChild(this.element);
  }

  shootProjectile() {
    const centerX = this.left + this.width / 2;
    const centerY = this.top + this.height / 2;
    let direction = 1.5;
    // for (let i = 0; i < direction; i++) {}1.5,2,4//

    const angleToTarget = Math.PI / direction; // 90 degrees in radians

    // Example bullet properties
    const bulletSpeed = 6;
    const bulletSize = 20;
    const bulletSprite = "bullets.png";
    const bulletDamage = 1;

    // Create a new bullet starting from the center of the enemy
    const bullet = new Bullet(
      this.gameScreen,
      centerX,
      centerY,
      bulletSpeed,
      angleToTarget,
      bulletSize,
      bulletSprite,
      bulletDamage
    );

    this.bulletsArr.push(bullet);

    // Update the bullet position in each frame
    setInterval(() => {
      bullet.update();
    }, 20);
  }

  shootProjectile2() {
    const centerX = this.left + this.width / 2;
    const centerY = this.top + this.height / 2;
    let direction = 1.8;
    // for (let i = 0; i < direction; i++) {}1.5,2,4//

    const angleToTarget = Math.PI / direction; // 90 degrees in radians

    // Example bullet properties
    const bulletSpeed = 2;
    const bulletSize = 20;
    const bulletSprite = "bullets.png";
    const bulletDamage = 1;

    // Create a new bullet starting from the center of the enemy
    const bullet = new Bullet(
      this.gameScreen,
      centerX,
      centerY,
      bulletSpeed,
      angleToTarget,
      bulletSize,
      bulletSprite,
      bulletDamage
    );

    this.bulletsArr.push(bullet);
    // Update the bullet position in each frame
    setInterval(() => {
      bullet.update();
    }, 20);
  }

  move() {
    if (this.top < 100) {
      this.top += 3;
      this.updatePostion();
      // return;
    }

    if (this.top >= 100) {
      if (this.directionX === 0) {
        let random = Math.ceil(Math.random() * 10);
        if (random > 5) {
          this.directionX += 2;
        } else {
          this.directionX -= 2;
        }
      }

      if (this.left <= 532 && this.directionX > 0) {
        this.left += this.directionX;
      }

      if (this.left >= 0 && this.directionX < 0) {
        this.left += this.directionX;
      }

      if (this.left >= 532 && this.directionX > 0) {
        this.directionX *= -1;
      }

      if ((this.left <= 0) & (this.directionX < 0)) {
        this.directionX *= -1;
      }

      this.updatePostion();
    }
    // if (this.top >= 100 && this.left <= 0) {
    //   this.left += -3;
    //   this.updatePostion();
    // }
  }

  updatePostion() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  createExplosion() {
    let newElement = document.createElement("img");
    newElement.src = "explosion.gif";
    newElement.style.position = "absolute";
    newElement.style.left = `${this.left}px`;
    newElement.style.top = `${this.top}px`;
    newElement.style.width = `${this.width}px`;
    newElement.style.height = `${this.height}px`;

    this.gameScreen.appendChild(newElement);

    setTimeout(() => {
      newElement.remove();
    }, 1250);
  }
}
