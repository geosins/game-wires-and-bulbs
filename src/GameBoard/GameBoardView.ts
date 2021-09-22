import { Square } from './Square';

export class GameBoardView {
    private squaresView: HTMLElement[][];

    constructor(squares: Square[][], onClick: (x: number, y: number) => void) {
        this.initSquareView(squares);
        this.addClickHandler(onClick);
    }

    public render(): void {
        const root = document.getElementsByClassName('game-board')[0];
        root.innerHTML = '';

        for (let y = 0; y < this.squaresView[0].length; y++) {
            for (let x = 0; x < this.squaresView.length; x++) {
                root.appendChild(this.squaresView[x][y])
            }
            root.appendChild(document.createElement('br'))
        }
    }

    private initSquareView(squares: Square[][]): void {
        this.squaresView = squares.map((column, x) => column.map((square, y) => {
            const element = document.createElement('div');
            element.className = 'field';
            element.appendChild(square.render())
            return element;
        }))
    }

    private addClickHandler(onClick: (x: number, y: number) => void): void {
        for (let y = 0; y < this.squaresView[0].length; y++) {
            for (let x = 0; x < this.squaresView.length; x++) {
                this.squaresView[x][y].addEventListener('click', () => {
                    onClick(x, y);
                });
            }
        }
    }

}
