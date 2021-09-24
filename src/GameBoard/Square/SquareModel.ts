import { Direction, Shape } from '../../enums';

export class SquareModel {
    public rotation: number;
    public shape: Shape;
    public isActive: boolean;

    protected defaultRotation: number;

    constructor(rotation: number, shape: Shape) {
        this.shape = shape;
        this.defaultRotation = this.isRotatable ? rotation : 0;
        this.rotation = this.defaultRotation;
        this.isActive = this.getDefaultActiveStatus();
    }

    public get isRotatable(): boolean {
        return ![Shape.Rosette, Shape.Bulb, Shape.Wall].includes(this.shape);
    }

    public rotate(): void {
        if (this.isRotatable) {
            this.rotation = this.rotation == 270 ? 0 : this.rotation + 90;
        }
    }

    public resetActiveStatus(): void {
        this.isActive = this.getDefaultActiveStatus();
    }

    public resetRotation(): void {
        this.rotation = this.defaultRotation;
    }

    public receiveSignal(direction: Direction): Direction[] {
        if (this.isActive) {
            return [];
        }

        const contacts = this.getContacts();
        if (contacts.includes(direction) || this.shape === Shape.Bulb) {
            this.isActive = true;
            return contacts.filter(item => item != direction);
        } else {
            return [];
        }
    }

    protected getContacts(): Direction[] {

        switch(this.shape) {
            case Shape.Line:
                return this.getLineContacts();
            case Shape.Angle:
                return this.getAngleContacts();
            case Shape.Tack:
                return this.getTackContacts();
            case Shape.Cross:
                return this.getCrossContacts();
            case Shape.Wall:
                return this.getWallContacts();
            case Shape.Bulb:
                return this.getReceiverContacts();
            case Shape.Rosette:
                return this.getTransmitterContacts();
            default:
                const shape: never = this.shape;
                throw new Error(`Expected unknown shape: ${shape}`);
        }
    }

    private getDefaultActiveStatus(): boolean {
        return this.shape === Shape.Rosette;
    }

    private getLineContacts(): Direction[] {
        switch(this.rotation) {
            case 0:
            case 180:
                return [Direction.Up, Direction.Down];
            case 90:
            case 270:
                return [Direction.Left, Direction.Right];
        }
    }

    private getAngleContacts(): Direction[] {
        switch(this.rotation) {
            case 0:
                return [Direction.Up, Direction.Right];
            case 90:
                return [Direction.Down, Direction.Right];
            case 180:
                return [Direction.Left, Direction.Down];
            case 270:
                return [Direction.Left, Direction.Up];
        }
    }

    private getTackContacts(): Direction[] {
        switch(this.rotation) {
            case 0:
                return [Direction.Left, Direction.Right, Direction.Down];
            case 90:
                return [Direction.Down, Direction.Up, Direction.Left];
            case 180:
                return [Direction.Left, Direction.Right, Direction.Up];
            case 270:
                return [Direction.Down, Direction.Up, Direction.Right];
        }
    }

    private getCrossContacts(): Direction[] {
        return [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    }

    private getWallContacts() {
        return [];
    }

    private getReceiverContacts() {
        return [];
    }

    private getTransmitterContacts() {
        return [];
    }
}