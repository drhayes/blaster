'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';
import Bullet from '../sprites/bullet';
import Enforcer from '../sprites/enforcer';

export default class Main extends Phaser.State {
  create() {
    this.game.shooting.init();
    this.game.explosions.init();
    this.game.spawn.init();

    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.2;
    this.back.tint = 0xcb0404;

    this.game.enemiesGroup = this.game.add.group();
    this.game.enemiesGroup.add(new Enforcer(this.game, 100, 100));
    this.game.enemiesGroup.add(new Enforcer(this.game, 700, 100));
    this.game.enemiesGroup.add(new Enforcer(this.game, 100, 700));
    this.game.enemiesGroup.add(new Enforcer(this.game, 700, 700));

    this.game.enemiesGroup.add(new Guard(this.game, 900, 800));
    this.game.enemiesGroup.add(new Guard(this.game, 1000, 800));
    this.game.enemiesGroup.add(new Guard(this.game, 1100, 800));
    this.game.enemiesGroup.add(new Guard(this.game, 1200, 800));
  }

  update() {
    let player = this.game.player;
    if (player) {
      this.game.physics.arcade.collide(player, this.game.enemiesGroup, player.onCollide, null, player);
      this.back.tilePosition.x = -player.x * 0.2;
      this.back.tilePosition.y = -player.y * 0.2;
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
