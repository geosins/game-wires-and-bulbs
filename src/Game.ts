import { GameBoard } from './GameBoard';
import { ControlPanel } from './ControlPanel';
import { GameView } from './GameView';

export class Game {
    public levelNumber = 0;

    private board: GameBoard;
    private controlPanel: ControlPanel;

    private view: GameView;

    constructor() {
        this.bindFunctions();
        this.init();
    }

    public render(): HTMLElement {
        return this.view.render();
    }

    protected onEndOfTurn(): void {
        const isWin = this.board.isAllReceiversActive;
        this.controlPanel.setMessage(isWin ? 'Вы выиграли' : '');
    }

    protected onResetButtonClick(): void {
        this.board.reset();
        this.controlPanel.setMessage('');
    }

    protected onNextButtonClick(): void {
        this.board.reset();
    }

    private bindFunctions(): void {
        this.onEndOfTurn = this.onEndOfTurn.bind(this);
        this.onResetButtonClick = this.onResetButtonClick.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
    }

    private init(): void {
        this.board = new GameBoard(this.levelNumber, this.onEndOfTurn);
        this.controlPanel = new ControlPanel({
            onNextButtonClick: this.onNextButtonClick,
            onRestartButtonClick: this.onResetButtonClick,
            isNextButtonActive: false,
            message: '',
        })
        this.view = new GameView({
            gameBoard: this.board,
            controlPanel: this.controlPanel,
        });
    }

}
