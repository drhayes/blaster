'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';
import Bullet from '../sprites/bullet';

export default class Main extends Phaser.State {
  create() {
    this.game.shooting.init();
    this.game.explosions.init();

    this.game.player = this.player = new Player(this.game, 200, 200);
    this.game.add.existing(this.player);

    this.game.enemiesGroup = this.game.add.group();
    this.game.enemiesGroup.add(new Guard(this.game, 300, 200));
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.game.enemiesGroup);
  }

  render() {
    // this.game.enemiesGroup.children.forEach((c) => {
    //   this.game.debug.body(c);
    // });
    // this.game.shooting.pool.children.forEach((c) => {
    //   this.game.debug.body(c);
    // });
    // this.game.debug.body(this.player);
  }
};
