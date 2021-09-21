import { Square } from './Square';
import { Utils } from './Utils';
import { levels } from './levels';
import { GameBoard } from './GameBoard';

export class GameBoardFactory {
    public static getGameBoard(onEndOfTurn: () => void, levelNumber?: number): GameBoard {
        const squares = this.getSquares(levelNumber);
        return new GameBoard(squares, onEndOfTurn);
    }

    protected static getSquares(levelNumber?: number): Square[][] {
        const level = levels[levelNumber] || Utils.getRandomItem(levels);

        const squares = Utils.createMatrix(
            level.length,
            level[0].length,
        );

        level.forEach((row, y) => row.forEach((shape, x) => {
            const rotate = Utils.getRandomItem([0, 90, 180, 270]);
            squares[x][y] = new Square(rotate, shape);
        }));

        return squares;
    }
}