'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';

export default class Main extends Phaser.State {
  create() {
    this.player = new Player(this.game, 200, 200);
    this.game.add.existing(this.player);

    let guard = new Guard(this.game, 800, 500);
    this.game.add.existing(guard);
  }
};
