import { Shape } from '../../../enums';
import { SquareModel } from './SquareModel';

export class RosetteSquareModel extends SquareModel {
    public shape = Shape.Rosette;

    protected isRotatable = false;
    protected defaultActiveStatus = true;
}
