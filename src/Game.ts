import { GameBoard } from './GameBoard';

export class Game {
    public isWin: boolean;
    public levelNumber = 1;

    private board: GameBoard;

    constructor() {
        this.board = new GameBoard(this.levelNumber, this.onEndOfTurn.bind(this));
    }

    public start(): void {
        this.board.render();
    }

    private onEndOfTurn(): void {
        this.isWin = this.board.isAllReceiversActive;
    }
}
