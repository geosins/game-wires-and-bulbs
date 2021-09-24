import { Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class WallSquareModel extends SquareModel {
    public shape = Shape.Wall;
    protected isRotatable = false;
}