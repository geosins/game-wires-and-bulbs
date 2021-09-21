import { Game } from './Game';

try {
    const game = new Game();
    game.start();
} catch (e) {
    alert(e.message);
}
