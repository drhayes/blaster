'use strict';

import Bullet from '../sprites/bullet';

const NUM_BULLETS = 50;

export default class Shooting extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.shooting = this;
  }

  init() {
    this.pool = this.game.add.group();
    for (let x = 0; x < NUM_BULLETS; x++) {
      let bullet = new Bullet(this.game, 0, 0);
      bullet.alive = bullet.exists = bullet.visible = false;
      this.pool.add(bullet)
    }
  }

  update() {
    this.game.physics.arcade.overlap(this.game.enemiesGroup, this.pool, this.onOverlap, null, this);
  }

  onOverlap(enemy, bullet) {
    this.game.explosions.fire(bullet.x, bullet.y);
    bullet.kill();
  }
};
