import { Game } from './game.js';

Array.prototype.remove = function(el) {
    let i = this.indexOf(el)
    if (i > -1) {
       this.splice(i, 1);
    }
    return this; 
}

let game = new Game({
    speed: 1000 /// 50
});
window.onload = () => {
  game.start();
}