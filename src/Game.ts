import { GameBoard } from './GameBoard';
import { ControlPanel } from './ControlPanel';
import { GameView } from './GameView';
import { levels } from './levels';

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
        if (this.board.isAllReceiversActive) {
            this.onWin()
        }
    }

    protected onResetButtonClick(): void {
        this.board.reset();
        this.controlPanel.setMessage('');
    }

    protected onNextButtonClick(): void {
        this.levelNumber++;

        this.controlPanel.setMessage('');
        this.view.setTitle(`Провода и лампочки. Уровень ${this.levelNumber + 1}.`)
        this.controlPanel.setNextButtonActiveStatus(false);

        this.board = this.getNewGameBoard();
        this.view.updateGameBoard(this.board);
        this.view.render();
    }

    protected onWin() {
        if (this.levelNumber < levels.length - 1) {
            this.controlPanel.setMessage('Вы выиграли. Желаете продолжить?');
            this.controlPanel.setNextButtonActiveStatus(true);
        } else {
            this.controlPanel.setMessage('Вы выиграли!');
        }
    }

    private bindFunctions(): void {
        this.onEndOfTurn = this.onEndOfTurn.bind(this);
        this.onResetButtonClick = this.onResetButtonClick.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
    }

    private init(): void {
        this.board = this.getNewGameBoard();
        this.controlPanel = new ControlPanel({
            onNextButtonClick: this.onNextButtonClick,
            onRestartButtonClick: this.onResetButtonClick,
            isNextButtonActive: false,
            message: '',
        })
        this.view = new GameView({
            gameBoard: this.board,
            controlPanel: this.controlPanel,
            title: `Провода и лампочки. Уровень ${this.levelNumber + 1}.`,
        });
    }

    private getNewGameBoard(): GameBoard {
        let isLevelCorrect = false;
        let board: GameBoard;

        do {
            board = new GameBoard(this.levelNumber, this.onEndOfTurn);
            isLevelCorrect = !board.isAllReceiversActive;
        } while (!isLevelCorrect)

        return board;
    }

}
