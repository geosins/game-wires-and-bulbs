import { Utils } from '../Utils';
import { levels } from '../levels';

import { Square } from './Square';
import { GameBoardModel } from './GameBoardModel';
import { GameBoardView } from './GameBoardView';

export class GameBoard {
    private onEndOfTurn: () => void;
    private squares: Square[][];

    private model: GameBoardModel;
    private view: GameBoardView;

    constructor(levelNumber: number, onEndOfTurn: () => void) {
        this.onSquareClick = this.onSquareClick.bind(this);
        this.onEndOfTurn = onEndOfTurn;

        this.squares = this.getSquares(levelNumber);
        this.model = new GameBoardModel(this.squares);
        this.view = new GameBoardView(this.squares, this.onSquareClick);
    }

    public get isAllReceiversActive(): boolean {
        return this.model.isAllReceiversActive;
    }

    public render(): HTMLElement {
        this.model.start();
        return this.view.render();
    }

    public reset(): void {
        this.squares.forEach(row => row.forEach(square => square.resetRotation()));
        this.model.reset();
        this.model.start();
    }

    private onSquareClick(x: number, y: number): void {
        this.model.onClick(x, y);
        this.onEndOfTurn();
    }

    private getSquares(levelNumber: number): Square[][] {
        const level = levels[levelNumber];

        const squares = Utils.createMatrix(
            level.length,
            level[0].length,
        );

        level.forEach((row, y) => row.forEach((shape, x) => {
            const rotate = Utils.getRandomItem([0, 90, 180, 270]);
            squares[x][y] = new Square(rotate, shape);
        }));

        return squares;
    }
}
