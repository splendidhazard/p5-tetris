let tileSize = 30;
let cols = 10;
let rows = 20;

let board;
let currentPiece;
let dropInterval = 1000; // milliseconds
let lastDropTime = 0;
let gameOver = false;

function setup() {
  let canvas = createCanvas(cols * tileSize, rows * tileSize);
  canvas.parent("tetris-canvas");

  board = new Board(cols, rows, tileSize);
  spawnNewPiece();
}

function draw() {
  background(20);

  if (!gameOver) {
    board.draw();
    currentPiece.draw();

    if (millis() - lastDropTime > dropInterval) {
      dropPiece();
      lastDropTime = millis();
    }
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 100, 100);
    text("Game Over", width / 2, height / 2);
  }
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
    board.clearFullRows();
    spawnNewPiece();
  }
}

function keyPressed() {
  if (gameOver) return;

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
      // Revert rotation by rotating 3 more times
      currentPiece.rotate();
      currentPiece.rotate();
      currentPiece.rotate();
    }
  }
}
