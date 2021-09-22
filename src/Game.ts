import { GameBoard } from './GameBoard';
import { GameView } from './GameView';

export class Game {
    public levelNumber = 1;

    private board: GameBoard;

    private view: GameView;

    constructor() {
        this.board = new GameBoard(this.levelNumber, this.onEndOfTurn.bind(this));
        this.view = new GameView({
            gameBoard: this.board,
            message: '',
        });
    }

    public render(): HTMLElement {
        return this.view.render();
    }

    private onEndOfTurn(): void {
        const isWin = this.board.isAllReceiversActive;
        this.view.updateMessage(isWin ? 'Вы выиграли' : '');
    }
}
