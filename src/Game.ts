import { GameBoard } from './GameBoard';
import { View } from './View';

export class Game {
    private board: GameBoard;
    private view: View;

    constructor() {
        this.board = new GameBoard();
        this.board.init(10, 10);
    }

    public start(): void {
        this.board.start();
        this.view = new View(this.board.squares, this.board.onClick);
        this.view.render();
    }
}
