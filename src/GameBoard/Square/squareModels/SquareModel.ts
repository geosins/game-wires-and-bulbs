import { Direction, Shape } from '../../../enums';

export abstract class SquareModel {
    public rotation: number;
    public isActive: boolean;
    public abstract readonly shape: Shape;

    protected defaultRotation: number;

    protected isRotatable = true;
    protected defaultActiveStatus = false;

    public init(rotation: number): void {
        this.defaultRotation = this.isRotatable ? rotation : 0;
        this.rotation = this.defaultRotation;
        this.isActive = this.defaultActiveStatus;
    }

    public rotate(): void {
        if (this.isRotatable) {
            this.rotation = this.rotation === 270 ? 0 : this.rotation + 90;
        }
    }

    public resetActiveStatus(): void {
        this.isActive = this.defaultActiveStatus;
    }

    public resetRotation(): void {
        this.rotation = this.defaultRotation;
    }

    public receiveSignal(direction: Direction): Direction[] {
        let res: Direction[] = [];

        const contacts = this.getContacts();
        if (!this.isActive && contacts.includes(direction)) {
            this.isActive = true;
            res = contacts.filter(item => item !== direction);
        }

        return res;
    }

    protected getContacts(): Direction[] {
        return [];
    }
}
