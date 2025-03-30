class Board {
    constructor(cols, rows, tileSize) {
      this.cols = cols;
      this.rows = rows;
      this.tileSize = tileSize;
  
      // Initialize grid (2D array of nulls)
      this.grid = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
      );
    }
  
    draw() {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.grid[y][x]) {
            fill(this.grid[y][x]);
            stroke(255);
            strokeWeight(1);
            rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
          } else {
            noFill();
            stroke(240);
            rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
          }
        }
      }
    }
  
    isValidPosition(piece) {
      for (let pos of piece.getTilePositions()) {
        if (
          pos.x < 0 ||
          pos.x >= this.cols ||
          pos.y >= this.rows ||
          (pos.y >= 0 && this.grid[pos.y][pos.x])
        ) {
          return false;
        }
      }
      return true;
    }
  
    lockPiece(piece) {
      for (let pos of piece.getTilePositions()) {
        if (pos.y >= 0) {
          this.grid[pos.y][pos.x] = piece.color;
        }
      }
    }
  
    clearFullRows() {
      let newGrid = this.grid.filter(row => row.some(cell => !cell));
      const clearedLines = this.rows - newGrid.length;
  
      while (newGrid.length < this.rows) {
        newGrid.unshift(Array(this.cols).fill(null));
      }
  
      this.grid = newGrid;
      return clearedLines;
    }
  
    isGameOver() {
      return this.grid[0].some(cell => cell !== null);
    }
  }
  