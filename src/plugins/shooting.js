'use strict';

import Bullet from '../sprites/bullet';

const NUM_BULLETS = 50;

export default class Shooting extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.shooting = this;
  }

  init() {
    this.pool = this.game.add.group(this.game.world, 'playerBullets');
    this.pool.classType = Bullet;
    this.pool.createMultiple(NUM_BULLETS);
  }

  update() {
    this.game.physics.arcade.overlap(this.game.enemiesGroup, this.pool, this.onOverlap, null, this);
  }

  onOverlap() {
    console.log('????');
  }
};
