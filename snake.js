import {Pathfinder} from './pathfinder.js';
import {Point} from './point.js';

export class Snake {
  /**
   * @param {Point} pos
   * @param {Pathfinder} pathfinder
   */
  constructor(pos, pathfinder) {
    this.pos = pos;
    this.pathfinder = pathfinder;
    this.tailLength = 3;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.trail = [];
  }

  /**
   * @param {Point} newPos
   */
  updatePosition(newPos) {
    this.pos = newPos;
  }

  activatePathfinder() {
    this.pathfinderInterval = setInterval(() => {
      let initial = this.pathfinder.path[0];
      let point = this.pathfinder.path[1];
      if (point.x - initial.x < 0 && this.velocity.x !== 1) {
        this.velocity.x = -1;
        this.velocity.y = 0;
      }
      if (point.y - initial.y < 0 && this.velocity.y !== 1) {
        this.velocity.x = 0;
        this.velocity.y = -1;
      }
      if (point.x - initial.x > 0 && this.velocity.x !== -1) {
        this.velocity.x = 1;
        this.velocity.y = 0;
      }
      if (point.y - initial.y > 0 && this.velocity.y !== -1) {
        this.velocity.x = 0;
        this.velocity.y = 1;
      }
      this.pathfinder.path.shift();
    }, this.pathfinder.speed);
  }
}

