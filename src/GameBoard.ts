import { Direction, Shape } from './enums';
import { Square } from './Square';

interface Coords {
    x: number;
    y: number;
}

interface Signal extends Coords {
    direction: Direction;
}

export class GameBoard {
    public readonly squares: Square[][];

    private onEndOfTurn: () => void;

    private transmitterSignals: Signal[] = [];
    private receiverCoords: Coords[] = [];

    constructor(squares: Square[][], onEndOfTurn: () => void) {
        this.onClick = this.onClick.bind(this);

        this.squares = squares;
        this.onEndOfTurn = onEndOfTurn;

        this.init();
    }

    public onClick(x, y): void {
        this.reset();
        this.squares[x][y].rotate();
        this.start();
        this.onEndOfTurn();
    }

    public reset(): void {
        this.squares.forEach(column => column.forEach(field => field && field.reset()));
    }

    public start(): void {
        this.transmitterSignals.forEach(this.receiveSignal, this);
    }

    public isAllReceiversActive(): boolean {
        return this.receiverCoords.every(({ x, y }) => this.squares[x][y].isActive)
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
                if (this.squares[x][y].shape === Shape.Receiver) {
                    this.receiverCoords.push({ x, y })
                }

                if (this.squares[x][y].shape === Shape.Transmitter) {
                    this.transmitterSignals.push(
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