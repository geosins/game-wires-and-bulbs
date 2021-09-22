import { Square } from './Square';
import { Utils } from '../Utils';

const ROOT_CLASS_NAME = 'game-board';

export class GameBoardView {
    private classNames = {
        root: ROOT_CLASS_NAME,
        square: `${ROOT_CLASS_NAME}__square`,
    }

    private elements;

    constructor(squares: Square[][], onClick: (x: number, y: number) => void) {
        this.initElements(squares);
        this.addClickHandler(onClick);
    }

    public render(): HTMLElement {
        const { root, squares } = this.elements;

        for (let y = 0; y < squares[0].length; y++) {
            for (let x = 0; x < squares.length; x++) {
                root.appendChild(squares[x][y])
            }
            root.appendChild(document.createElement('br'))
        }

        return root;
    }

    private initElements(squares: Square[][]): void {
        this.elements = {
            root: Utils.createElement('div', this.classNames.root),
            squares: this.createSquareWrappers(squares),
        }
    }

    private createSquareWrappers(squares: Square[][]): HTMLElement[][] {
        return squares.map(row => row.map(square => {
            return Utils.createElement('div', this.classNames.square, [square.render()]);
        }))
    }

    private addClickHandler(onClick: (x: number, y: number) => void): void {
        this.elements.squares.forEach((row, x) => row.forEach((square, y) => {
            square.addEventListener('click', () => onClick(x, y));
        }))
    }

}
