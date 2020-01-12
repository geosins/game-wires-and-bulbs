import { Square } from './Square';

export class View {
    private squares: Square[][];
    private squaresView: HTMLElement[][];

    constructor(squares: Square[][], onClick: (x: number, y: number) => void) {
        this.squares = squares;
        this.initFieldsView();
        this.addClickHandler(onClick);
        this.actualiseView();
    }

    public render(): void {
        const body = document.body;
        body.innerHTML = '';

        for (let y = 0; y < this.squaresView[0].length; y++) {
            for (let x = 0; x < this.squaresView.length; x++) {
                body.appendChild(this.squaresView[x][y])
            }
            body.appendChild(document.createElement('br'))
        }
    }

    private initFieldsView(): void {
        this.squaresView = this.squares.map((column, x) => column.map((field, y) => {
            const element = document.createElement('div');
            element.className = 'field';
            element.innerHTML = field ? field.shape : '';
            return element;
        }))
    }

    private addClickHandler(onClick: (x: number, y: number) => void): void {
        for (let y = 0; y < this.squaresView[0].length; y++) {
            for (let x = 0; x < this.squaresView.length; x++) {
                this.squaresView[x][y].addEventListener('click', () => {
                    onClick(x, y);
                    this.actualiseView();
                });
            }
        }
    }

    private actualiseView(): void {
        this.squares.forEach((column, x) => column.forEach((field, y) => {
            if (field) {
                const style = this.squaresView[x][y].style;
                style.color = field.isActive ? 'red' : 'black';
                style.transform = `rotate(${field.rotation}deg)`;
            }
        }))
    }
}
