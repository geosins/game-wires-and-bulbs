import { Direction, Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class AngleSquareModel extends SquareModel {
    public shape = Shape.Angle;

    protected getContacts(): Direction[] {
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
}