'use strict';

import Behavior from './behavior';

const MAX_VEL = 600;
const DRAG = 1200;
const MOVE_ACC = 2000;
const THRESHOLD = 0.01;

export default class PlayerMove extends Behavior {
  constructor() {
    super();
    this.up = this.down = this.left = this.right = null;
    this.pad = null;
  }

  added(player) {
    this.player = player;
    player.body.maxVelocity.setTo(MAX_VEL);
    player.body.drag.setTo(DRAG);
    // TODO: Configurable somehow?
    this.up = player.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = player.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = player.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = player.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.pad = player.game.input.gamepad.pad1;
  }

  update(player) {
    if (!player.alive) {
      return;
    }
    let body = player.body;
    let accelX = 0;
    let accelY = 0;
    if (this.up.isDown || this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) {
      accelY = -MOVE_ACC;
    } else if (this.down.isDown || this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
      accelY = MOVE_ACC;
    }
    if (this.left.isDown || this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
      accelX = -MOVE_ACC;
    } else if (this.right.isDown || this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
      accelX = MOVE_ACC;
    }

    // TODO: Don't let player switch velocities instantly using stick.
    if (this.pad.connected) {
      let leftStickX = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
      let leftStickY = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
      if (leftStickX < -THRESHOLD || leftStickX > THRESHOLD) {
        body.velocity.x = MAX_VEL * leftStickX;
        accelX = 0;
      }
      if (leftStickY < -THRESHOLD || leftStickY > THRESHOLD) {
        body.velocity.y = MAX_VEL * leftStickY;
        accelY = 0;
      }
    }

    body.acceleration.x = accelX;
    body.acceleration.y = accelY;
  }
}
