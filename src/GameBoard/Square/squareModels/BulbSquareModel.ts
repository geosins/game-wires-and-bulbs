import { Direction, Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class BulbSquareModel extends SquareModel {
    public shape = Shape.Bulb;

    protected isRotatable = false;

    public receiveSignal(): Direction[] {
        this.isActive = true;
        return [];
    }
}
