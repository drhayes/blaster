'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';

export default class Main extends Phaser.State {
  create() {
    this.game.shooting.init();

    this.player = new Player(this.game, 200, 200);
    this.game.add.existing(this.player);

    this.game.enemiesGroup = this.game.add.group(this.game.world, 'enemiesGroup');
    this.game.enemiesGroup.addChild(new Guard(this.game, 300, 200));
  }
};
