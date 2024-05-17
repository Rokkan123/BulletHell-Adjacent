class Bullet {
  constructor(gameScreen, x, y, speed, angle, size, sprite, damage) {
    this.gameScreen = gameScreen;
    this.left = x;
    this.top = y;
    this.speed = speed;
    this.angle = angle;
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

    this.left += dx;
    this.top += dy;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    if (
      this.top < 0 ||
      this.left < 0 ||
      this.left > this.gameScreen.offsetWidth ||
      this.top > this.gameScreen.offsetHeight
    ) {
      this.element.remove();
    }
  }
  bulletCollide(player) {
    const bulletRect = this.element.getBoundingClientRect();
    const playerRect = player.element.getBoundingClientRect();

    if (
      bulletRect.left < playerRect.right &&
      bulletRect.right > playerRect.left &&
      bulletRect.top < playerRect.bottom &&
      bulletRect.bottom > playerRect.top
    ) {
      console.log("Colliding");
      return true;
    } else {
      return false;
    }
  }
  createExplosion() {
    let newElement = document.createElement("img");
    newElement.src = "explosion.gif";
    newElement.style.position = "absolute";
    newElement.style.left = `${this.left}px`;
    newElement.style.top = `${this.top}px`;
    newElement.style.width = `50px`;
    newElement.style.height = `50px`;

    this.gameScreen.appendChild(newElement);

    setTimeout(() => {
      newElement.remove();
    }, 1250);
  }
}
