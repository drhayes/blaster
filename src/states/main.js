'use strict';

import Player from '../sprites/player';

export default class Main extends Phaser.State {
  create() {
    this.player = new Player(this.game, 200, 200);
    this.game.add.existing(this.player);
  }
};
