import { Shape } from './enums';

const I = Shape.Line;
const L = Shape.Angle;
const X = Shape.Cross;
const T = Shape.Tack;
const W = Shape.Wall;
const O = Shape.Transmitter;
const o = Shape.Receiver;

type Level = Shape[][];

export const levels: Level[] = [
    [
        [O,I,I,I,I,o],
    ],
    [
        [O,X,W,T,L,L],
        [L,I,I,L,L,o],
    ]
];
