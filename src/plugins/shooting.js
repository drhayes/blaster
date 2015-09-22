'use strict';

import Bullet from '../sprites/bullet';

const NUM_BULLETS = 50;
const SOUND_DELAY = 60;

export default class Shooting extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.shooting = this;
    this.shootSound = game.add.audio('shoot');
    this.shootSoundDelay = 0;
  }

  init() {
    this.pool = this.game.add.group();
    for (let x = 0; x < NUM_BULLETS; x++) {
      let bullet = new Bullet(this.game, 0, 0);
      bullet.alive = bullet.exists = bullet.visible = false;
      this.pool.add(bullet)
    }
  }

  fire(sx, sy, vx, vy) {
    let bullet = this.pool.getFirstExists(false);
    if (bullet) {
      bullet.reset(sx, sy);
      bullet.fire(vx, vy);
      if (this.shootSoundDelay <= 0) {
        this.shootSound.play();
        this.shootSoundDelay = SOUND_DELAY + Math.random() * 10;
      }
    }
  }

  update() {
    this.shootSoundDelay -= this.game.time.physicsElapsedMS;
    this.game.physics.arcade.overlap(this.game.enemiesGroup, this.pool, this.onOverlap, null, this);
  }

  onOverlap(enemy, bullet) {
    this.game.explosions.small(bullet.x, bullet.y);
    enemy.position.x -= enemy.body.overlapX / 2;
    enemy.position.y -= enemy.body.overlapY / 2;
    enemy.damage(bullet.attack);
    bullet.kill();
  }
};
