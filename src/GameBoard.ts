import { Direction, Shape } from './enums';
import { Utils } from './Utils';
import { Square } from './Square';

interface Signal {
    x: number;
    y: number;
    direction: Direction;
}

export class GameBoard {
    public squares: Square[][];

    private initSignal: Signal = { x:0, y:0, direction: Direction.Right };

    constructor() {
        this.onClick = this.onClick.bind(this);
    }

    public init(m: number, n: number): void {
        this.squares = Utils.createMatrix(m, n);

        for (let x = 0; x < m; x++) {
            for (let y = 0; y < n; y++) {
                this.squares[x][y] = this.createSquare();
            }
        }

        this.squares[0][0] = null;
    }

    public onClick(x, y): void {
        this.reset();
        this.squares[x][y].rotate();
        this.start();
    }

    public reset(): void {
        this.squares.forEach(column => column.forEach(field => field && field.reset()));
    }

    public start(): void {
        const signal = this.getAdjacentSignal(this.initSignal);
        this.receiveSignal(signal);
    }

    private receiveSignal({ direction, ...coords }: Signal): void {
        const currentSquare = this.squares[coords.x] && this.squares[coords.x][coords.y];
        if (currentSquare) {
            const nextSignalsDirections = currentSquare.receiveSignal(direction);
            nextSignalsDirections.forEach(nextSignalDirection => {
                const nextSignal = this.getAdjacentSignal({ ...coords, direction: nextSignalDirection });
                this.receiveSignal(nextSignal);
            })
        }
    }

    private getAdjacentSignal(signal: Signal): Signal {
        switch(signal.direction) {
            case Direction.Up:
                return {x: signal.x, y: signal.y-1, direction: Direction.Down};
            case Direction.Down:
                return {x: signal.x, y: signal.y+1, direction: Direction.Up};
            case Direction.Left:
                return {x: signal.x-1, y: signal.y, direction: Direction.Right};
            case Direction.Right:
                return {x: signal.x+1, y: signal.y, direction: Direction.Left};
        }
    }

    private createSquare(): Square {
        const rotate = Utils.getRandomItem([0, 90, 180, 270]);
        const shape = Utils.getRandomItem(Shape);
        return new Square(rotate, shape);
    }
}