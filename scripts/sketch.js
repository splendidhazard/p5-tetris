let tileSize = 30;
let cols = 10;
let rows = 15;

let board;
let currentPiece;
let dropInterval = 1000;
let lastDropTime = 0;

let gameRunning = false;
let gamePaused = false;
let gameOver = false;
let score = 0;

function setup() {
  let canvas = createCanvas(cols * tileSize, rows * tileSize);
  canvas.parent("tetris-canvas");

  frameRate(60); // smoother timing

  initGame();
  noLoop(); // wait until Start is pressed
}

function draw() {
  background(20);

  if (!gameRunning || gamePaused) return;

  board.draw();
  currentPiece.draw();

  if (millis() - lastDropTime > dropInterval) {
    dropPiece();
    lastDropTime = millis();
  }

  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 100, 100);
    text("Game Over", width / 2, height / 2);
    noLoop();
  }
}

function initGame() {
  board = new Board(cols, rows, tileSize);
  score = 0;
  updateScore();
  spawnNewPiece();
}

function spawnNewPiece() {
  let randomShape = random(SHAPES);
  currentPiece = new Piece(randomShape.shape, randomShape.color);

  if (!board.isValidPosition(currentPiece)) {
    gameOver = true;
  }
}

function dropPiece() {
  currentPiece.move(0, 1);
  if (!board.isValidPosition(currentPiece)) {
    currentPiece.move(0, -1); // revert
    board.lockPiece(currentPiece);
    let cleared = board.clearFullRows();
    score += cleared * 100;
    updateScore();
    spawnNewPiece();
  }
}

function keyPressed() {
  if (!gameRunning || gamePaused || gameOver) return;

  if (keyCode === LEFT_ARROW) {
    currentPiece.move(-1, 0);
    if (!board.isValidPosition(currentPiece)) currentPiece.move(1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    currentPiece.move(1, 0);
    if (!board.isValidPosition(currentPiece)) currentPiece.move(-1, 0);
  } else if (keyCode === DOWN_ARROW) {
    dropPiece();
    lastDropTime = millis();
  } else if (key === ' ' || keyCode === UP_ARROW) {
    currentPiece.rotate();
    if (!board.isValidPosition(currentPiece)) {
      currentPiece.rotate(); currentPiece.rotate(); currentPiece.rotate();
    }
  }
}

function updateScore() {
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}

// Button Actions

function startGame() {
  if (!gameRunning) {
    initGame();
    gameRunning = true;
    gamePaused = false;
    gameOver = false;
    loop();
  } else if (gamePaused) {
    gamePaused = false;
    loop();
  }
}

function togglePause() {
  if (!gameRunning || gameOver) return;

  gamePaused = !gamePaused;
  if (gamePaused) {
    noLoop();
  } else {
    lastDropTime = millis(); // prevent instant drop after resume
    loop();
  }
}

function resetGame() {
  gameRunning = false;
  gamePaused = false;
  gameOver = false;
  score = 0;
  updateScore();
  initGame();
  loop();
}
