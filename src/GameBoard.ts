class GameBoard {
    constructor() {
        this.initSignalCoords = {x:0, y:0};
        this.initSignalDirection = Direction.Right;

        this.onClick = this.onClick.bind(this);
    }

    init(m, n) {
        this.squares = Utils.createMatrix(m, n);

        for (let x = 0; x < m; x++) {
            for (let y = 0; y < n; y++) {
                this.squares[x][y] = this.createSquare();
            }
        }

        this.squares[0][0] = null;
    }

    onClick(x, y) {
        this.reset();
        this.squares[x][y].rotate();
        this.start();
    }

    reset() {
        this.squares.forEach(column => column.forEach(field => field && field.reset()));
    }

    start() {
        const params = this.getAdjacentSquare(this.initSignalCoords, this.initSignalDirection)
        this.receiveSignal(params, params.direction);
    }

    receiveSignal(coords/*:{x: number, y: number}*/, direction) {
        const currentField = this.squares[coords.x] && this.squares[coords.x][coords.y];
        if (currentField) {
            const nextSignals = currentField.receiveSignal(direction);
            nextSignals.forEach(signal => {
                const params = this.getAdjacentSquare(coords, signal);
                this.receiveSignal(params, params.direction);
            })
        }
    }

    getAdjacentSquare(coords, direction) {
        switch(direction) {
            case Direction.Up:
                return {x: coords.x, y: coords.y-1, direction: Direction.Down};
            case Direction.Down:
                return {x: coords.x, y: coords.y+1, direction: Direction.Up};
            case Direction.Left:
                return {x: coords.x-1, y: coords.y, direction: Direction.Right};
            case Direction.Right:
                return {x: coords.x+1, y: coords.y, direction: Direction.Left};
        }
    }

    createSquare() {
        const rotate = Utils.getRandomItem([0, 90, 180, 270]);
        const shape = Utils.getRandomItem(Shape);
        return new Square(rotate, shape);
    }
}