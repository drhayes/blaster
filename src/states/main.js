'use strict';

import Player from '../sprites/player';

export default class Main extends Phaser.State {
  create() {
    console.log('Main create');

    this.player = new Player(this.game, 100, 100);
    this.game.add.existing(this.player);
  }
};
