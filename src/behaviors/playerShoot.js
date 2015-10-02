'use strict';

import Behavior from './behavior';

const THRESHOLD = 0.001;
const BULLET_WAVER_DEGREES = 5;
const HALF_WAVER = BULLET_WAVER_DEGREES / 2;

export default class PlayerShoot extends Behavior {
  constructor() {
    super();
    this.pad = null;
    this.up = this.down = this.left = this.right = null;
    this.angleForShoot = new Phaser.Point(0, 0);
  }

  added(player) {
    this.player = player;
    // TODO: Configurable somehow?
    this.up = player.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.down = player.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.left = player.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.right = player.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.pad = player.game.input.gamepad.pad1;
  }

  update(player) {
    if (!player.alive) {
      return;
    }
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
      // Compute angle for shot.
      this.angleForShoot.set(shootX, shootY);
      this.angleForShoot.normalize();
      this.angleForShoot.rotate(0, 0, Math.random() * BULLET_WAVER_DEGREES - HALF_WAVER, true);
      player.game.shooting.playerShoot(player.x, player.y, this.angleForShoot.x, this.angleForShoot.y);
    }
  }
}
