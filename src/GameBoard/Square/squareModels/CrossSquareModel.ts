import { Direction, Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class CrossSquareModel extends SquareModel {
    public shape = Shape.Cross;

    protected getContacts(): Direction[] {
        return [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    }
}