import { Direction, Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class TackSquareModel extends SquareModel {
    public shape = Shape.Tack;

    protected getContacts(): Direction[] {
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
}