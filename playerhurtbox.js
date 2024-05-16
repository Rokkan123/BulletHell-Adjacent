class PlayerHurtbox extends Player {
  constructor(parentElement, x, y, width, height) {
    this.parentElement = parentElement;
    this.width = width;
    this.height = height;
    this.top = y;
    this.left = x;
    this.element = document.createElement("img");
    this.element.src = "playerHurtbox.png";
    this.element.style.position = "absolute";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.parentElement.appendChild(this.element);
  }

  move() {
    // Implement movement logic if needed
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

  // Add other methods as needed
}
