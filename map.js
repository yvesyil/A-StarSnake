import {Point} from './point.js';

export class Map {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.grid = new Array(this.row);
    for (let i = 0; i < this.col; i++) {
      this.grid[i] = new Array(this.col);
    }

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.grid[i][j] = new Point(i, j);
      }
    }

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.grid[i][j].addNeighbors();
      }
    }
  }

  getPoint(x, y) {
    return this.grid[x][y];
  }
}