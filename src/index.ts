import { Game } from './Game';

try {
    const game = new Game();
    const element = game.render();
    document.body.appendChild(element);
} catch (e) {
    alert(e.message);
    throw e;
}
