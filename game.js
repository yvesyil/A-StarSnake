import {Map} from './map.js';
import {Pathfinder} from './pathfinder.js';
import {Snake} from './snake.js';

/**
 * @typedef {Object} Config
 * @property {number} speed
 */

export class Game {
  /**
   * @param {Config} config
   */
  constructor(config) {
    this.config = config;
    this.canvas = document.querySelector('#game');
    this.context = this.canvas.getContext('2d');
    document.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  start() {
    this.gridSize = 20;
    this.tileCount = 30;
    this.map = new Map(this.tileCount, this.tileCount);

    this.fruit = this.map.getPoint(7, 7);
    this.snake = new Snake(this.map.getPoint(4, 5),
        new Pathfinder(this.map, this.config.speed));

    this.timer = setInterval(this.loop.bind(this), this.config.speed);
    this.snake.pathfinder.find(this.snake.pos, this.fruit);
  }

  reset() {
    clearInterval(this.timer);
    this.snake.deactivePathfinder();
    delete this.map;
    delete this.snake;
    this.start();
  }

  loop() {
    this.update();
    this.draw();
  }

  update() {
    // update velocity
    this.snake.moveToNextPoint();

    // update position
    let tentativeX = this.snake.pos.x + this.snake.velocity.x;
    let tentativeY = this.snake.pos.y + this.snake.velocity.y;
    let updateFlag = false;

    if (tentativeX < 0) {
      this.snake.updatePosition(
          this.map.getPoint(this.map.row - 1, this.snake.pos.y));
      updateFlag = true;
    }
    if (tentativeY < 0) {
      this.snake.updatePosition(
          this.map.getPoint(this.snake.pos.x, this.map.col - 1));
      updateFlag = true;
    }
    if (tentativeX > this.map.col - 1) {
      this.snake.updatePosition(this.map.getPoint(0, this.snake.pos.y));
      updateFlag = true;
    }
    if (tentativeY > this.map.row - 1) {
      this.snake.updatePosition(this.map.getPoint(this.snake.pos.x, 0));
      updateFlag = true;
    }

    if (!updateFlag) {
      this.snake.updatePosition(this.map.getPoint(tentativeX, tentativeY));
    }

    // check trail collision
    this.snake.trail.forEach(t => {
      if (this.snake.pos.x === t.x && this.snake.pos.y === t.y) {
        this.reset();
      }
    });

    // update trail
    this.snake.pos.occupied = true;
    this.snake.trail.push(this.snake.pos);
    while (this.snake.trail.length > this.snake.tailLength) {
      let p = this.snake.trail.shift();
      p.occupied = false;
    }

    // check if fruit has been eaten
    if (this.snake.pos.x === this.fruit.x && this.snake.pos.y ===
        this.fruit.y) {
      this.snake.tailLength++;
      let tentativeFruitPos = this.map.getPoint(Math.floor(Math.random() * this.tileCount), Math.floor(Math.random() * this.tileCount));
      while (tentativeFruitPos.occupied) {
        tentativeFruitPos = this.map.getPoint(Math.floor(Math.random() * this.tileCount), Math.floor(Math.random() * this.tileCount));
      }
      this.fruit = tentativeFruitPos;
      this.snake.pathfinder.resetMap();
      this.snake.pathfinder.find(this.snake.pos, this.fruit);
    }
  }

  draw() {
    this.context.fillStyle = 'Black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = 'White';
    this.context.font = '20px Arial';
    this.context.fillText(this.snake.tailLength, 20, 40);

    this.snake.trail.forEach(t => {
      t.draw(this.context, 'White', this.gridSize);
    });

    /*
    this.snake.pathfinder.openSet.forEach(p => {
      p.draw(this.context, 'Yellow', this.gridSize);
    });

    this.snake.pathfinder.closedSet.forEach(p => {
      p.draw(this.context, 'Green', this.gridSize);
    });

    this.snake.pathfinder.path.forEach(p => {
      p.draw(this.context, `rgba(0, 0, 255, 0.5)`, this.gridSize);
    });
     */

    this.fruit.draw(this.context, 'Red', this.gridSize);
  }

  /**
   * @param {DocumentEventMap[string]} event
   */
  onKeyPress(event) {
    // arrow keys
    if (event.keyCode === 37 && this.snake.velocity.x !== 1) {
      this.snake.velocity.x = -1;
      this.snake.velocity.y = 0;
    }
    if (event.keyCode === 38 && this.snake.velocity.y !== 1) {
      this.snake.velocity.x = 0;
      this.snake.velocity.y = -1;
    }
    if (event.keyCode === 39 && this.snake.velocity.x !== -1) {
      this.snake.velocity.x = 1;
      this.snake.velocity.y = 0;
    }
    if (event.keyCode === 40 && this.snake.velocity.y !== -1) {
      this.snake.velocity.x = 0;
      this.snake.velocity.y = 1;
    }
    // ESC
    if (event.keyCode === 27) {
      this.reset();
    }
  }
}