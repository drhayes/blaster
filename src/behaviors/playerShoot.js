'use strict';

import Behavior from './behavior';
import Bullet from '../sprites/bullet';

const THRESHOLD = 0.001;
const NUM_BULLETS = 50;
const BULLET_MAIN_VELOCITY = 1000;
const BULLET_WAVER_DEGREES = 5;
const HALF_WAVER = BULLET_WAVER_DEGREES / 2;

export default class PlayerShoot extends Behavior {
  constructor() {
    super()
    this.pad = null;
    this.pool = null;
    this.angleForShoot = new Phaser.Point(0, 0);
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
    if (shootX || shootY) {
      let bullet = this.pool.getFirstExists(false);
      if (bullet) {
        // Do both so that the onRevived event fires in the bullet so it'll set its
        // lifetime timer correctly.
        // TODO: Put a fire method in bullet instead of this insanity.
        bullet.revive();
        // Computer angle for shot.
        this.angleForShoot.set(shootX, shootY);
        Phaser.Point.normalize(this.angleForShoot, this.angleForShoot);
        Phaser.Point.rotate(this.angleForShoot, 0, 0, Math.random() * BULLET_WAVER_DEGREES - HALF_WAVER, true);
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = BULLET_MAIN_VELOCITY * this.angleForShoot.x;
        bullet.body.velocity.y = BULLET_MAIN_VELOCITY * this.angleForShoot.y;
      }
    }
  }
};
