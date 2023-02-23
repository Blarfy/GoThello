class Board {
    constructor() {
        this.grid = new Array(8);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(8);
        }
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = null;
            }
        }
    }

    clearBoard() {
        for (i = 0; i < this.grid.length; i++) {
            for (j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = null;
            }
        }
    }

    placePiece(piece, x, y) {
        this.grid[x][y] = piece;
    }

    removePiece(x, y) {
        this.grid[x][y] = null;
    }

    getPiece(x, y) {
        return this.grid[x][y];
    }

    getGrid() {
        return this.grid;
    }
}