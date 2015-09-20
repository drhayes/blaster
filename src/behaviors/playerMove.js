'use strict';

import Behavior from './behavior';

const MAX_VEL = 600;
const DRAG = 1200;
const MOVE_ACC = 2000;

export default class PlayerMove extends Behavior {
  constructor() {
    super();
    this.up = this.down = this.left = this.right = null;
  }

  added(player) {
    this.player = player;
    player.body.maxVelocity.setTo(MAX_VEL);
    player.body.drag.setTo(DRAG);
    this.up = player.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.down = player.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.left = player.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right = player.game.input.keyboard.addKey(Phaser.Keyboard.D);
  }

  update(player) {
    let x = 0;
    let y = 0;
    if (this.up.isDown) {
      y = -MOVE_ACC;
    } else if (this.down.isDown) {
      y = MOVE_ACC;
    }
    if (this.left.isDown) {
      x = -MOVE_ACC;
    } else if (this.right.isDown) {
      x = MOVE_ACC;
    }
    player.body.acceleration.x = x;
    player.body.acceleration.y = y;
  }
};
