import {Map} from './map.js';
import {Pathfinder} from './pathfinder.js';
import {Snake} from './snake.js';
import {Point} from './point.js';

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
    this.snake = new Snake(this.map.getPoint(0, 0),
        new Pathfinder(this.map, this.config.speed));

    this.timer = setInterval(this.loop.bind(this), this.config.speed);
  }

  reset() {
    clearInterval(this.timer);
    delete this.map;
    delete this.snake;
    this.start();
  }

  loop() {
    this.update();
    this.draw();
  }

  update() {
    this.snake.pos.x += this.snake.velocity.x;
    this.snake.pos.y += this.snake.velocity.y;

    if (this.snake.pos.x < 0) {
      this.snake.updatePosition(this.map.getPoint(this.map.row))
      this.snake.pos.x = this.tileCount - 1;
    }
    if (this.snake.pos.y < 0) {
      this.snake.pos.y = this.tileCount - 1;
    }
    if (this.snake.pos.x > this.tileCount - 1) {
      this.snake.pos.x = 0;
    }
    if (this.snake.pos.y > this.tileCount - 1) {
      this.snake.pos.y = 0;
    }

    this.snake.trail.forEach(t => {
      if (this.snake.pos.x === t.x && this.snake.pos.y === t.y) {
        this.reset();
      }
    });

    this.snake.trail.push(new Point(this.snake.pos.x, this.snake.pos.y));
    while (this.snake.trail.length > this.snake.tailLength) {
      this.snake.trail.shift();
    }

    if (this.snake.pos.x === this.fruit.x && this.snake.pos.y ===
        this.fruit.y) {
      this.snake.tailLength++;
      this.fruit.x = Math.floor(Math.random() * this.tileCount);
      this.fruit.y = Math.floor(Math.random() * this.tileCount);
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

    this.snake.pathfinder.openSet.forEach(p => {
      p.draw(this.context, 'Yellow', this.gridSize);
    });

    this.snake.pathfinder.closedSet.forEach(p => {
      p.draw(this.context, 'Green', this.gridSize);
    });

    this.fruit.draw(this.context, 'Red', this.gridSize);
  }

  /**
   * @param {DocumentEventMap[string]} event
   */
  onKeyPress(event) {
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
    if (event.keyCode === 27) {
      this.reset();
    }
  }
}