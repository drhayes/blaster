'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';
import Bullet from '../sprites/bullet';

export default class Main extends Phaser.State {
  create() {
    this.game.shooting.init();
    this.game.explosions.init();
    this.game.spawn.init();

    this.game.enemiesGroup = this.game.add.group();
    this.game.enemiesGroup.add(new Guard(this.game, 600, 600));
    this.game.enemiesGroup.add(new Guard(this.game, 700, 600));
    this.game.enemiesGroup.add(new Guard(this.game, 800, 600));
    this.game.enemiesGroup.add(new Guard(this.game, 900, 600));
  }

  update() {
    let player = this.game.player;
    if (player) {
      this.game.physics.arcade.collide(player, this.game.enemiesGroup, player.onCollide, null, player);
    }
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
