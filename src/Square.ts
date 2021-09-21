import { Direction, Shape } from './enums';

export class Square {
    public rotation: number;
    public shape: Shape;
    public isActive: boolean;

    constructor(rotation, shape) {
        this.rotation = rotation;
        this.shape = shape;
        this.isActive= this.getDefaultResetStatus();
    }

    public rotate(): void {
        this.rotation = this.rotation == 270 ? 0 : this.rotation + 90;
    }

    public reset(): void {
        this.isActive = this.getDefaultResetStatus();
    }

    public receiveSignal(direction: Direction): Direction[] {
        if (this.isActive) {
            return [];
        }

        const contacts = this.getContacts();
        if (contacts.includes(direction) || this.shape === Shape.Receiver) {
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
            case Shape.Receiver:
                return this.getReceiverContacts();
            case Shape.Transmitter:
                return this.getTransmitterContacts();
            default:
                const shape: never = this.shape;
                throw new Error(`Expected unknown shape: ${shape}`);
        }
    }

    private getDefaultResetStatus(): boolean {
        return this.shape === Shape.Transmitter;
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