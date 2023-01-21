import {Point} from './point.js';
import {Map} from './map.js'

export class Pathfinder {
  /**
   * @param {Map} map
   * @param {number} speed
   */
  constructor(map, speed) {
    this.map = map;
    this.openSet = [];
    this.closedSet = [];
    this.path = [];
    this.speed = speed;
  }

  /**
   * @param {Point} a
   * @param {Point} b
   * @returns {number}
   */
  distance(a, b) {
    return Math.sqrt((a.x - b.x) + (a.y - b.y));
  }

  /**
   * @param {Point} start
   * @param {Point} goal
   */
  find(start, goal) {
    this.openSet.push(start);

    while (this.openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }
      let current = this.openSet[winner];

      if (this.openSet[winner] === goal) {
        let pointIndex = current;
        this.path.push(pointIndex);
        while (pointIndex.previous) {
          this.path.push(pointIndex);
          pointIndex = pointIndex.previous;
        }
        this.path.reverse();
      }

      this.openSet.remove(current);
      this.closedSet.push(current);

      let neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (!this.closedSet.includes(neighbor) && !neighbor.occupied) {
          let tentativeG = current.g + 1;

          if (this.openSet.includes(neighbor)) {
            if (tentativeG < neighbor.g) {
              neighbor.g = tentativeG;
            }
          } else {
            neighbor.g = tentativeG;
            this.openSet.push(neighbor);
          }

          neighbor.h = this.distance(neighbor, goal);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }

  resetMap() {
    this.openSet = [];
    this.closedSet = [];
    this.path = [];
    for (let i = 0; i < this.map.row; i++) {
      for (let j = 0; j < this.map.col; j++) {
        this.map.grid[i][j].g = 0;
        this.map.grid[i][j].h = 0;
        this.map.grid[i][j].f = 0;
        this.map.grid[i][j].previous = undefined;
      }
    }
  }
}