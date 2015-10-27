import Behavior from './behavior';
import keyConfig from '../keyConfig';

export default class PlayerBomb extends Behavior {
  added(player) {
    this.player = player;
    this.bombKey = player.game.input.keyboard.addKey(keyConfig.bomb);
    this.bombKey.onDown.add(this.handleBomb, this);
  }

  handleBomb() {
    if (!this.player.alive) {
      return;
    }
    this.player.game.bombs.boom(this.player.x, this.player.y);
  }
}
