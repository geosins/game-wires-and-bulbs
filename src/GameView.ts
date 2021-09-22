import { GameBoard } from './GameBoard';
import { ControlPanel } from './ControlPanel';
import { Utils } from './Utils';

interface Params {
    gameBoard: GameBoard;
    controlPanel: ControlPanel;
    title: string;
}

const ROOT_CLASS_NAME = 'game';

export class GameView {
    private classNames = {
        root: ROOT_CLASS_NAME,
        title: `${ROOT_CLASS_NAME}__title`,
        controlPanel: `${ROOT_CLASS_NAME}__control-panel`,
    }

    private elements;

    constructor(params: Params) {
        this.initElements(params);
    }

    public render(): HTMLElement {
        const { root, title, controlPanel, gameBoard } = this.elements;

        root.innerHTML = '';

        root.appendChild(title);
        root.appendChild(gameBoard);
        root.appendChild(controlPanel);

        return root;
    }

    public updateGameBoard(gameBoard: GameBoard): void {
        this.elements.gameBoard = gameBoard.render();
    }

    public setTitle(title: string): void {
        this.elements.title.innerText = title;
    }

    private initElements(params: Params) {
        this.elements = {
            root: Utils.createElement('div', this.classNames.root),
            title: Utils.createElement('h2', this.classNames.title, [], params.title),
            controlPanel: Utils.createElement('div', this.classNames.controlPanel, [params.controlPanel.render()]),
            gameBoard: params.gameBoard.render(),
        }
    }

}