import Behavior from './behavior';
import keyConfig from '../keyConfig';

export default class PlayerBomb extends Behavior {
  constructor() {
    super();
    this.bomb = null;
    this.justPressed = true;
    this.count = 1;
  }

  added(player) {
    this.player = player;
    this.bombKey = player.game.input.keyboard.addKey(keyConfig.bomb);
    this.bombKey.onDown.add(this.handleBomb, this);
  }

  update(player) {
    if (!player.alive) {
      return;
    }
  }

  handleBomb() {
    if (!this.player.alive || this.count <= 0) {
      return;
    }
    // TODO: Not infinite bombs.
    // this.count--;
    // TODO: Cooldown.
    this.player.game.bombs.boom(this.player.x, this.player.y);
  }
}
