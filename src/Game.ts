import { GameBoardFactory } from './GameBoardFactory';
import { GameBoard } from './GameBoard';
import { View } from './View';

export class Game {
    public isWin: boolean;

    private board: GameBoard;
    private view: View;

    constructor() {
        this.onEndOfTurn = this.onEndOfTurn.bind(this);

        this.board = GameBoardFactory.getGameBoard(this.onEndOfTurn);
    }

    public start(): void {
        this.board.start();
        this.view = new View(this.board.squares, this.board.onClick);
        this.view.render();
    }

    private onEndOfTurn(): void {
        this.isWin = this.board.isAllReceiversActive();
    }
}
