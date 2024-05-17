class PlayerBullet {
  constructor(gameScreen, x, y, speed, angle, size, sprite, damage) {
    this.gameScreen = gameScreen;
    this.x = x;
    this.y = y;
    this.speed = speed; //speed
    this.angle = angle; //angle shot
    this.size = size; // Size of the bullet
    this.sprite = sprite; // URL or path to the bullet sprite
    this.damage = damage; // Damage dealt by the bullet

    this.element = document.createElement("img");
    this.element.src = this.sprite;
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;

    this.gameScreen.appendChild(this.element);
  }

  update() {
    const dx = Math.cos(this.angle) * this.speed;
    const dy = Math.sin(this.angle) * this.speed;

    console.log("update bullet", this.dy, this.dx);
    this.x += dx;
    this.y += dy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    if (
      this.y < 0 ||
      this.x < 0 ||
      this.x > this.gameScreen.offsetWidth ||
      this.y > this.gameScreen.offsetHeight
    ) {
      this.element.remove();
    }
  }

  didCollide(obstacle) {
    const playerBullet = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerBullet.left < obstacleRect.right &&
      playerBullet.right > obstacleRect.left &&
      playerBullet.top < obstacleRect.bottom &&
      playerBullet.bottom > obstacleRect.top
    ) {
      console.log("Colliding");
      return true;
    } else {
      return false;
    }
  }
}
