import { Direction, Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class LineSquareModel extends SquareModel {
    public shape = Shape.Line;

    protected getContacts(): Direction[] {
        switch (this.rotation) {
            case 0:
            case 180:
                return [Direction.Up, Direction.Down];
            case 90:
            case 270:
                return [Direction.Left, Direction.Right];
            default:
                throw new Error(`Expected unknown rotation: ${this.rotation}`);
        }
    }
}
