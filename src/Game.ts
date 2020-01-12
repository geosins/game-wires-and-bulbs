class Game {
    constructor() {
        this.board = new GameBoard();
        this.board.init(10, 10);
    }

    start() {
        this.board.start();
        this.view = new View(this.board.squares, this.board.onClick);
        this.view.render();
    }
}

const game = new Game();
game.start();
