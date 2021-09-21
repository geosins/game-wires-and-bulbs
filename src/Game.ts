import { GameBoardFactory } from './GameBoardFactory';
import { GameBoard } from './GameBoard';
import { View } from './View';

export class Game {
    private board: GameBoard;
    private view: View;

    constructor() {
        this.board = GameBoardFactory.getGameBoard();
    }

    public start(): void {
        this.board.start();
        this.view = new View(this.board.squares, this.board.onClick);
        this.view.render();
    }
}
