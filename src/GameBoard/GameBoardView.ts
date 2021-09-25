import './GameBoard.scss';
import { Square } from './Square';
import { Utils } from '../Utils';

interface Params {
    squares: Square[][];
    onClick(x: number, y: number): void;
    onRotateEnd(): void;
}

const ROOT_CLASS_NAME = 'game-board';

export class GameBoardView {
    private classNames = {
        root: ROOT_CLASS_NAME,
        square: `${ROOT_CLASS_NAME}__square`,
    };

    private elements;

    constructor(params: Params) {
        this.initElements(params.squares);
        this.addClickHandler(params);
    }

    public render(): HTMLElement {
        const { root, squares } = this.elements;

        for (let y = 0; y < squares[0].length; y++) {
            for (let x = 0; x < squares.length; x++) {
                root.appendChild(squares[x][y]);
            }
        }

        return root;
    }

    private initElements(squares: Square[][]): void {
        this.elements = {
            root: this.createRootElement(squares),
            squares: this.createSquareWrappers(squares),
        };
    }

    private createRootElement(squares: Square[][]): HTMLElement {
        const element = Utils.createElement('div', this.classNames.root);
        element.style.grid = `repeat(${squares[0].length}, 50px) / repeat(${squares.length}, 50px)`;
        return element;
    }

    private createSquareWrappers(squares: Square[][]): HTMLElement[][] {
        return squares.map(row => row.map(square => Utils.createElement('div', this.classNames.square, [square.render()])));
    }

    private addClickHandler(params: Params): void {
        this.elements.squares.forEach((row, x) => row.forEach((square, y) => {
            square.addEventListener('click', () => params.onClick(x, y));
            square.addEventListener('transitionend', params.onRotateEnd);
        }));
    }
}
