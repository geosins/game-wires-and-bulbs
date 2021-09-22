import { Direction, Shape } from '../enums';
import { Square } from './Square';

interface Coords {
    x: number;
    y: number;
}

interface Signal extends Coords {
    direction: Direction;
}

export class GameBoardModel {
    private readonly squares: Square[][];
    private rosetteSignals: Signal[] = [];
    private bulbCoords: Coords[] = [];

    constructor(squares: Square[][]) {
        this.onClick = this.onClick.bind(this);

        this.squares = squares;

        this.init();
    }

    public get isAllReceiversActive(): boolean {
        return this.bulbCoords.every(({ x, y }) => this.squares[x][y].isActive)
    }

    public onClick(x: number, y: number): void {
        this.reset();
        this.squares[x][y].rotate();
        this.start();
    }

    public reset(): void {
        this.squares.forEach(column => column.forEach(field => field.resetActiveStatus()));
    }

    public start(): void {
        this.rosetteSignals.forEach(this.receiveSignal, this);
    }

    private receiveSignal({ direction, ...coords }: Signal): void {
        if (this.isSquareExist(coords.x, coords.y)) {
            const currentSquare = this.squares[coords.x][coords.y];
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

    private isSquareExist(x: number, y: number): boolean {
        return !!(this.squares[x] && this.squares[x][y]);
    }

    private init() {
        for (let x = 0; x < this.squares.length; x++) {
            for (let y = 0; y < this.squares[0].length; y++) {
                if (this.squares[x][y].shape === Shape.Bulb) {
                    this.bulbCoords.push({ x, y })
                }

                if (this.squares[x][y].shape === Shape.Rosette) {
                    this.rosetteSignals.push(
                        this.getAdjacentSignal({ x, y, direction: Direction.Up }),
                        this.getAdjacentSignal({ x, y, direction: Direction.Down }),
                        this.getAdjacentSignal({ x, y, direction: Direction.Left }),
                        this.getAdjacentSignal({ x, y, direction: Direction.Right }),
                    )
                }
            }
        }
    }

}