Array.prototype.remove = function(el) {
    let i = this.indexOf(el)
    if (i > -1) {
       this.splice(i, 1)
    }
    return this; 
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.prev = undefined;
    }
    addNeighbors(that) {
        if (this.x < that.col - 1)
            this.neighbors.push(that.grid[this.x + 1][this.y]);
        if (this.x > 0)
            this.neighbors.push(that.grid[this.x - 1][this.y]);
        if (this.y < that.row - 1)
            this.neighbors.push(that.grid[this.x][this.y + 1]);
        if (this.y > 0)
            this.neighbors.push(that.grid[this.x][this.y - 1]);
    }
}

class Astar {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
    }
    initGrid() {
        let that = this;
        this.grid = new Array(this.row);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(this.col);
        }

        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j] = new Point(i, j);
            }
        }
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.grid[i][j].addNeighbors(that);
            }
        }
    }
    heuristic(a, b) {
        return Math.sqrt((a.x - b.x) + (a.y - b.y));
    }
    //may need some tweaking
    findPath(s, g) {
        let start = this.grid[s.x][s.y];
        let goal = this.grid[g.x][g.y];
        this.openSet.push(start);

        while (this.openSet.length > 0) {
            let winner = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[winner].f)
                    winner = i; 
            }
            let current = this.openSet[winner];
            if (this.openSet[winner] === goal) {
                let temp = current;
                this.path.push(temp);
                while (temp.prev) {
                    this.path.push(temp.prev);
                    temp = temp.prev;
                }
                console.log("Done");
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
                    } 
                    else {
                        neighbor.g = tempG;
                        this.openSet.push(neighbor);
                    }
                    neighbor.h = this.heuristic(neighbor, goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.prev = current;
                }
            } 
        }
        return;
    }
}