'use strict';

import Player from '../sprites/player';
import Guard from '../sprites/guard';
import Bullet from '../sprites/bullet';
import Enforcer from '../sprites/enforcer';
import Assassin from '../sprites/assassin';

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
    this.back.tilePosition.x = -this.game.world.centerX * 0.2;
    this.back.tilePosition.y = -this.game.world.centerY * 0.2;

    this.game.enemiesGroup = this.game.add.group();
    this.game.enemiesGroup.add(new Assassin(this.game, 300, 300));
    // for (let i = 0; i < 6; i++) {
    //   this.game.enemiesGroup.add(new Enforcer(this.game, this.game.world.randomX, this.game.world.randomY));
    // }
    // for (let i = 0; i < 10; i++) {
    //   this.game.enemiesGroup.add(new Guard(this.game, this.game.world.randomX, this.game.world.randomY));
    // }
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
