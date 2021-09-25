import { SquareModel, createSquareModel } from './squareModels';
import { SquareView } from './SquareView';
import { Direction, Shape } from '../../enums';

export class Square {
    protected model: SquareModel;
    protected view: SquareView;

    constructor(shape: Shape, rotation: number) {
        this.model = createSquareModel(shape);
        this.model.init(rotation);
        this.view = new SquareView(shape);
    }

    public get isActive(): boolean {
        return this.model.isActive;
    }

    public get shape(): Shape {
        return this.model.shape;
    }

    public render(): HTMLElement {
        return this.view.render(this.model);
    }

    public resetActiveStatus(): void {
        this.model.resetActiveStatus();
        this.view.setIsActiveStatus(this.model.isActive);
    }

    public resetRotation(): void {
        this.model.resetRotation();
        this.view.rotateRoot(this.model.rotation);
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
