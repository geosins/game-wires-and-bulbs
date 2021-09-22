import { GameBoard } from './GameBoard';
import { Utils } from './Utils';

interface Params {
    gameBoard: GameBoard;
    message: string;
}

const ROOT_CLASS_NAME = 'game';

export class GameView {
    private classNames = {
        root: ROOT_CLASS_NAME,
        title: `${ROOT_CLASS_NAME}__title`,
        message: `${ROOT_CLASS_NAME}__message`,
    }

    private elements;

    constructor(params: Params) {
        this.initElements(params);
    }

    public render(): HTMLElement {
        const { root, title, message, gameBoard } = this.elements;

        root.appendChild(title);
        root.appendChild(gameBoard);
        root.appendChild(message);

        return root;
    }

    public updateMessage(message: string) {
        this.elements.message.innerText = message;
    }

    private initElements(params: Params) {
        this.elements = {
            root: Utils.createElement('div', this.classNames.root),
            title: Utils.createElement('h2', this.classNames.title, [], 'Игра'),
            message: Utils.createElement('h3', this.classNames.message, [], params.message),
            gameBoard: params.gameBoard.render(),
        }
    }

}