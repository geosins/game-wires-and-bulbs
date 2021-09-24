import { Shape } from '../../../enums';
import { SquareModel } from './SquareModel';
import { LineSquareModel } from './LineSquareModel';
import { AngleSquareModel } from './AngleSquareModel';
import { CrossSquareModel } from './CrossSquareModel';
import { TackSquareModel } from './TackSquareModel';
import { WallSquareModel } from './WallSquareModel';
import { RosetteSquareModel } from './RosetteSquareModel';
import { BulbSquareModel } from './BulbSquareModel';

export { SquareModel } from './SquareModel';

export function createSquareModel(shape: Shape): SquareModel {
    switch (shape) {
        case Shape.Line:
            return new LineSquareModel();
        case Shape.Angle:
            return new AngleSquareModel();
        case Shape.Cross:
            return new CrossSquareModel();
        case Shape.Tack:
            return new TackSquareModel();
        case Shape.Wall:
            return new WallSquareModel();
        case Shape.Rosette:
            return new RosetteSquareModel();
        case Shape.Bulb:
            return new BulbSquareModel();
        default:
            const other: never = shape;
            throw new Error(`Expected unknown shape: ${other}`);
    }
}
