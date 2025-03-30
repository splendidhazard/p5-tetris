class Piece {
    constructor(shapeMatrix, color) {
      this.shape = shapeMatrix;  // 2D matrix of 1s and 0s
      this.color = color;
      this.tiles = [];
  
      this.x = 3; // Starting grid x position
      this.y = 0; // Starting grid y position
  
      this.createTiles();
    }
  
    createTiles() {
      this.tiles = [];
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col]) {
            let tile = new Tile(this.x + col, this.y + row, tileSize, this.color);
            this.tiles.push(tile);
          }
        }
      }
    }
  
    draw() {
      for (let tile of this.tiles) {
        tile.draw();
      }
    }
  
    move(dx, dy) {
      this.x += dx;
      this.y += dy;
      this.updateTilePositions();
    }
  
    rotate() {
      // Transpose and reverse rows for clockwise rotation
      const newShape = this.shape[0].map((_, col) =>
        this.shape.map(row => row[col]).reverse()
      );
      const oldShape = this.shape;
      this.shape = newShape;
      this.createTiles();
  
      // You might later add collision detection here
      // If rotation is invalid, you can revert back:
      // this.shape = oldShape;
      // this.createTiles();
    }
  
    updateTilePositions() {
      let index = 0;
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col]) {
            this.tiles[index].setPosition(this.x + col, this.y + row);
            index++;
          }
        }
      }
    }
  
    getTilePositions() {
      // Useful for collision detection
      let positions = [];
      for (let row = 0; row < this.shape.length; row++) {
        for (let col = 0; col < this.shape[row].length; col++) {
          if (this.shape[row][col]) {
            positions.push({ x: this.x + col, y: this.y + row });
          }
        }
      }
      return positions;
    }
  }
  
  const SHAPES = [
    {
      shape: [
        [1, 1, 1, 1]
      ],
      color: '#00f0f0' // I
    },
    {
      shape: [
        [1, 1],
        [1, 1]
      ],
      color: '#f0f000' // O
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      color: '#a000f0' // T
    },
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1]
      ],
      color: '#00f000' // S
    },
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0]
      ],
      color: '#f00000' // Z
    },
    {
      shape: [
        [1, 0, 0],
        [1, 1, 1]
      ],
      color: '#f0a000' // J
    },
    {
      shape: [
        [0, 0, 1],
        [1, 1, 1]
      ],
      color: '#0000f0' // L
    }
  ];
  