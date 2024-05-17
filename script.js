window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  function startGame() {
    game = new Game();
    game.start();

    console.log("start game");

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        game.player.directionX = 0;
      }

      if (e.key === "ArrowLeft" || e.key === "a") {
        game.player.directionX = 0;
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        game.player.directionY = 0;
      }

      if (e.key === "ArrowUp" || e.key === "w") {
        game.player.directionY = 0;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        if (game.player.directionX < 4) {
          game.player.directionX += 4;
        }
      }

      if (e.key === "ArrowLeft" || e.key === "a") {
        if (game.player.directionX > -4) {
          game.player.directionX -= 4;
        }
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        if (game.player.directionY < 4) {
          game.player.directionY += 4;
        }
      }

      if (e.key === "ArrowUp" || e.key === "w") {
        if (game.player.directionY > -4) {
          game.player.directionY -= 4;
        }
      }
      if (e.key === "Space") {
        // Call shootProjectilePlayer on game.player instance
        game.player.shootProjectilePlayer();
      }
    });
  }

  function restartGame() {
    startGame();

    game.gameEndScreen.style.display = "none";
    game.gameEndScreen.style.padding = 0;
    game.gameEndScreen.style.height = 0;
  }

  startButton.addEventListener("click", () => {
    startGame();
  });

  restartButton.addEventListener("click", () => {
    restartGame();
  });
};
