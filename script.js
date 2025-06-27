const spaceship = document.getElementById("spaceship");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn"); // NEW

let gravity = 0.5;
let lift = -8;
let velocity;
let spaceshipY;

let score;
let obstacleX;
let obstacleY;

let gameRunning = false;

function resetGame() {
  velocity = 0;
  spaceshipY = window.innerHeight / 2;

  score = 0;
  obstacleX = window.innerWidth;
  obstacleY = Math.random() * (window.innerHeight - 100);

  spaceship.style.top = spaceshipY + "px";
  obstacle.style.left = obstacleX + "px";
  obstacle.style.top = obstacleY + "px";
  scoreDisplay.textContent = "Score: 0";

  gameOverScreen.style.display = "none";
  startScreen.style.display = "none";

  gameRunning = true;
  update();
}

function gameOver() {
  gameRunning = false;
  finalScore.textContent = `Your Score: ${score}`;
  gameOverScreen.style.display = "block";
}

function update() {
  if (!gameRunning) return;

  velocity += gravity;
  spaceshipY += velocity;

  if (spaceshipY < 0) spaceshipY = 0;

  if (spaceshipY > window.innerHeight - 30) {
    spaceshipY = window.innerHeight - 30;
    gameOver();
    return;
  }

  spaceship.style.top = spaceshipY + "px";

  // Move obstacle
  obstacleX -= 6;
  if (obstacleX < -50) {
    obstacleX = window.innerWidth;
    obstacleY = Math.random() * (window.innerHeight - 100);
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
  obstacle.style.left = obstacleX + "px";
  obstacle.style.top = obstacleY + "px";

  // Collision detection
  const shipRect = spaceship.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  if (
    shipRect.left < obsRect.right &&
    shipRect.right > obsRect.left &&
    shipRect.top < obsRect.bottom &&
    shipRect.bottom > obsRect.top
  ) {
    gameOver();
    return;
  }

  requestAnimationFrame(update);
}

// Controls
document.body.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameRunning) velocity = lift;
});
document.body.addEventListener("click", () => {
  if (gameRunning) velocity = lift;
});

// Start and Restart Button Handlers
startBtn.addEventListener("click", () => {
  resetGame();
});

restartBtn.addEventListener("click", () => {
  resetGame();
});


