import {Map} from './map.js';

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    /** value to minimize */
    this.f = 0;
    /** cost of path from start to n */
    this.g = 0;
    /** cost of the cheapest path from n to goal */
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.occupied = false;
  }

  /**
   * @param {Map} map
   */
  addNeighbors(map) {
    if (this.x < map.col - 1) {
      this.neighbors.push(map.getPoint(this.x + 1, this.y));
    }
    if (this.x > 0) {
      this.neighbors.push(map.getPoint(this.x - 1, this.y));
    }
    if (this.y < map.row - 1) {
      this.neighbors.push(map.getPoint(this.x, this.y + 1));
    }
    if (this.y > 0) {
      this.neighbors.push(map.getPoint(this.x, this.y - 1));
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