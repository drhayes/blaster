'use strict';

import Behavior from './behavior';
import Bullet from '../sprites/bullet';

const THRESHOLD = 0.01;
const NUM_BULLETS = 50;
const BULLET_MAIN_VELOCITY = 1000;
const BULLET_CROSS_VELOCITY = 30;

export default class PlayerShoot extends Behavior {
  constructor() {
    super()
    this.pad = null;
    this.pool = null;
  }

  added(player) {
    this.player = player;
    this.pad = player.game.input.gamepad.pad1;
    this.pool = player.game.add.group(player.game.world, 'playerBullets');
    this.pool.classType = Bullet;
    this.pool.createMultiple(NUM_BULLETS);
  }

  update(player) {
    let shootX = 0;
    let shootY = 0;
    // TODO: Keyboard support!
    if (this.pad.connected) {
      let rightStickX = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
      let rightStickY = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
      if (rightStickX < -THRESHOLD || rightStickX > THRESHOLD) {
        shootX = rightStickX;
      }
      if (rightStickY < -THRESHOLD || rightStickY > THRESHOLD) {
        shootY = rightStickY;
      }
    }

    // TODO: Cooldown period!
    if (shootX) {
      let bullet = this.pool.getFirstExists(false);
      if (bullet) {
        // Do both so that the onRevived event fires in the bullet so it'll set its
        // lifetime timer correctly.
        bullet.revive();
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = BULLET_MAIN_VELOCITY * (shootX < 0 ? -1 : 1);
        bullet.body.velocity.y = player.game.rnd.integerInRange(-BULLET_CROSS_VELOCITY, BULLET_CROSS_VELOCITY);
        bullet.angle = Math.tan(bullet.body.velocity.y / bullet.body.velocity.x);
      }
    }
  }
};
