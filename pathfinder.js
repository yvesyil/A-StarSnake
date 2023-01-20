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
        console.log('done');
      }

      this.openSet.remove(current);
      this.closedSet.push(current);
      /*
      while (this.openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < this.openSet.length; i++) {
          if (this.openSet[i].f < this.openSet[winner].f)
            winner = i;
        }
          let temp = current;
          this.path.push(temp);
          while (temp.prev) {
            this.path.push(temp.prev);
            temp = temp.prev;
          }
          console.log('Done');
        }
        this.openSet = this.openSet.remove(current);
        this.closedSet.push(current);
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
          let neighbor = neighbors[i];
          if (!this.closedSet.includes(neighbor)) {
            let tempG = current.g + 1;
            if (this.openSet.includes(neighbor)) {
              if (tempG < neighbor.g) {
                neighbor.g = tempG;
              }
            } else {
              neighbor.g = tempG;
              this.openSet.push(neighbor);
            }
            neighbor.h = this.distance(neighbor, goalPoint);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.prev = current;
          }
        }
      }
      return;

       */
    }
  }
}