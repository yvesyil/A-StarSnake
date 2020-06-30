class Snake {
    constructor() {
        this.pos = {
            x: 15,
            y: 15,
        };
        this.tailLenght = 3;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.trail = [];
    }
}

class Fruit {
    constructor() {
        this.pos = {
            x: 7,
            y: 7,
        };
    }
}

class Game {
    constructor() {
        this.canvas = document.querySelector("#game");
        this.context = this.canvas.getContext("2d");
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }
    init() {
        this.gridSize = 20;
        this.tileCount = 30;
        this.snake = new Snake();
        this.fruit = new Fruit();
        this.ai = new Astar(this.tileCount, this.tileCount);
        this.ai.initGrid();

        this.timer = setInterval(this.mainLoop.bind(this), 1000 / 15);
    }
    reset() {
        clearInterval(this.timer);
        delete this.snake;
        delete this.fruit;
        this.init();
    }
    mainLoop() {
        this.update();
        this.draw(); 
    }
    update() {
        this.snake.pos.x += this.snake.velocity.x;
        this.snake.pos.y += this.snake.velocity.y;
        this.ai.findPath(this.snake.pos, this.fruit.pos);

        if (this.snake.pos.x < 0) { this.snake.pos.x = this.tileCount - 1; }
        if (this.snake.pos.y < 0) { this.snake.pos.y = this.tileCount - 1; }
        if (this.snake.pos.x > this.tileCount - 1) { this.snake.pos.x = 0; }
        if (this.snake.pos.y > this.tileCount - 1) { this.snake.pos.y = 0; }

        this.snake.trail.forEach(t => {
            if (this.snake.pos.x === t.x && this.snake.pos.y === t.y) { this.reset(); }
        });

        this.snake.trail.push({
            x: this.snake.pos.x,
            y: this.snake.pos.y,
        });
        while (this.snake.trail.length > this.snake.tailLenght) { this.snake.trail.shift(); }

        if (this.snake.pos.x === this.fruit.pos.x && this.snake.pos.y === this.fruit.pos.y) {
            this.snake.tailLenght++;
            this.fruit.pos.x = Math.floor(Math.random() * this.tileCount);
            this.fruit.pos.y = Math.floor(Math.random() * this.tileCount);
        }
    }
    draw() {
        this.context.fillStyle = "Black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "White";
        this.context.font = "20px Arial";
        this.context.fillText(this.snake.tailLenght, 20, 40);

        this.context.fillStyle = "White";
        this.snake.trail.forEach(t => {
            this.context.fillRect(t.x * this.gridSize, t.y * this.gridSize, this.gridSize - 6, this.gridSize - 6);
        });

        this.context.fillStyle = "Red";
        this.context.fillRect(this.fruit.pos.x * this.gridSize, this.fruit.pos.y * this.gridSize, this.gridSize - 6, this.gridSize - 6);
    }
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
        if (event.keyCode === 27) { this.reset(); }
    }
}

const game = new Game();
window.onload = () => game.init();