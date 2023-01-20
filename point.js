export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // minimize f value
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.prev = undefined;
  }

  /**
   * @param {Array<Array<Point>>} map
   */
  addNeighbors(map) {
    if (this.x < map[0].length - 1) {
      this.neighbors.push(map[this.x+1][this.y]);
    }
    if (this.x > 0) {
      this.neighbors.push(map[this.x][this.y+1]);
    }
    if (this.y < map.length - 1) {
      this.neighbors.push(map[this.x-1][this.y]);
    }
    if (this.y > 0) {
      this.neighbors.push(map[this.x][this.y-1]);
    }
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {string} color
   * @param {number} size
   */
  draw(context, color, size) {
    context.fillStyle = color;
    context.fillRect(this.x * size, this.y * size, size - 6, size - 6);
  }
}