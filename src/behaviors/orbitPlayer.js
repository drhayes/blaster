'use strict';

import Behavior from './behavior';

const ACCEL = 40;

export default class OrbitPlayer extends Behavior {
  constructor() {
    super();
  }

  update(entity) {
    let player = entity.game.player;
    if (!player || !player.alive) {
      entity.body.velocity.setTo(0);
      return;
    }
    let accelX = 0;
    let accelY = 0;
    if (player.x < entity.x) {
      accelX = -ACCEL;
    } else if (player.x > entity.x) {
      accelX = ACCEL;
    }
    if (player.y < entity.y) {
      accelY = -ACCEL;
    } else if (player.y > entity.y) {
      accelY = ACCEL;
    }
    entity.body.acceleration.x = accelX;
    entity.body.acceleration.y = accelY;
  }
};
