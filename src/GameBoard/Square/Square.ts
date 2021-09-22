import { SquareModel } from './SquareModel';
import { SquareView } from './SquareView';
import { Direction, Shape } from '../../enums';

export class Square {
    protected model: SquareModel;
    protected view: SquareView;

    constructor(rotation: number, shape: Shape) {
        this.model = new SquareModel(rotation, shape);
        this.view = new SquareView();
    }

    public get isActive(): boolean {
        return this.model.isActive;
    }

    public get rotation(): number {
        return this.model.rotation;
    }

    public get shape(): Shape {
        return this.model.shape;
    }

    public render(): HTMLElement {
        return this.view.render(this.model);
    }

    public reset(): void {
        this.model.reset();
        this.view.render(this.model);
    }

    public rotate(): void {
        this.model.rotate();
        this.view.rotateRoot(this.model.rotation);
    }

    public receiveSignal(direction: Direction): Direction[] {
        const nextDirections = this.model.receiveSignal(direction);
        this.view.setIsActiveStatus(this.model.isActive);
        return nextDirections;
    }
}