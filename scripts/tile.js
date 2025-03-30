class Tile {
    constructor(x, y, size, color) {
      this.x = x;           // x position in grid (not pixels)
      this.y = y;           // y position in grid (not pixels)
      this.size = size;     // size of the tile in pixels
      this.color = color;   // color of the tile
    }
  
    draw() {
      fill(this.color);
      stroke(255);
      strokeWeight(1);
      rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  
    move(dx, dy) {
      this.x += dx;
      this.y += dy;
    }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  