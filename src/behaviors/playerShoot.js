'use strict';

import Behavior from './behavior';
import Bullet from '../sprites/bullet';

const THRESHOLD = 0.001;
const NUM_BULLETS = 50;
const BULLET_WAVER_DEGREES = 5;
const HALF_WAVER = BULLET_WAVER_DEGREES / 2;
const SOUND_DELAY = 60;

export default class PlayerShoot extends Behavior {
  constructor() {
    super()
    this.pad = null;
    this.pool = null;
    this.up = this.down = this.left = this.right = null;
    this.angleForShoot = new Phaser.Point(0, 0);
    this.shootSound = null;
    this.shootSoundDelay = 0.
  }

  added(player) {
    this.player = player;
    // TODO: Configurable somehow?
    this.up = player.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.down = player.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.left = player.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.right = player.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.pad = player.game.input.gamepad.pad1;
    this.pool = player.game.add.group(player.game.world, 'playerBullets');
    this.pool.classType = Bullet;
    this.pool.createMultiple(NUM_BULLETS);
    this.shootSound = player.game.add.audio('shoot');
  }

  update(player) {
    this.shootSoundDelay -= player.game.time.physicsElapsedMS;
    let shootX = 0;
    let shootY = 0;
    if (this.up.isDown) {
      shootY = -1;
    } else if (this.down.isDown) {
      shootY = 1;
    }
    if (this.left.isDown) {
      shootX = -1;
    } else if (this.right.isDown) {
      shootX = 1;
    }
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
        // Compute angle for shot.
        this.angleForShoot.set(shootX, shootY);
        Phaser.Point.normalize(this.angleForShoot, this.angleForShoot);
        Phaser.Point.rotate(this.angleForShoot, 0, 0, Math.random() * BULLET_WAVER_DEGREES - HALF_WAVER, true);
        bullet.reset(player.x, player.y);
        bullet.fire(this.angleForShoot.x, this.angleForShoot.y);
        if (this.shootSoundDelay <= 0) {
          this.shootSound.play();
          this.shootSoundDelay = SOUND_DELAY + Math.random() * 10;
        }
      }
    }
  }
};
