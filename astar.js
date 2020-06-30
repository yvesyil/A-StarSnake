class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
    }
    addNeighbors(that) {
        if (this.x < that.col - 1)
            this.neighbors.push(grid[this.x + 1][this.y]);
        if (this.x > 0)
            this.neighbors.push(grid[this.x - 1][this.y]);
        if (this.y < that.row - 1)
            this.neighbors.push(grid[this.x][this.y + 1]);
        if (this.y > 0)
            this.neighbors.push(grid[this.x][this.y - 1]);
    }
}

class Astar {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.openSet = [];
        this.closedSet = [];
    }
    initGrid() {
        that = this;
        this.grid = new Array(this.row);
        this.grid.forEach(row => new Array(that.col));

        for (let i = 0; i < this.row.lenght; i++) {
            for (let j = 0; j < this.col.lenght; j++) {
                this.grid[i][j] = new Point(i, j);
            }
        }
        for (let i = 0; i < this.row.lenght; i++) {
            for (let j = 0; j < this.col.lenght; j++) {
                this.grid[i][j].addNeighbors(this);
            }
        }
    }
    //this needs tweaking
    findPath(s, g) {
        let start = this.grid[s.x][s.y];
        let goal = this.grid[g.x][g.y];
        this.openSet.push(start);
         
        while (this.openSet.lenght > 0) {
            let lowestFScore = 0;
            for (i of this.openSet.keys()) {

                if (this.openSet[i].f < this.openSet[lowestFScore].f)
                    lowestFScore = i; 
            }
            let current = this.openSet[lowestFScore];
            if (this.openSet[lowestFScore] === goal) console.log("Done");
            this.openSet.splice(lowestFScore, 1);
            this.closedSet.push(current);
            for (neighbor of current.neighbors) {
                if (!this.closedSet.includes(neighbor)) {
                    let tempG = current.g + 1;
                    if (this.openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) neighbor.g = tempG;
                        else {
                            neighbor.g = tempG;
                            this.openSet.push(neighbor);
                        }
                        neighbor.h = heuristic(neighbor, goal);
                    }
                }
            } 
        }
        return;
    }
}