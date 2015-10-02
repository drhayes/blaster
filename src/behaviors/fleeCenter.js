'use strict';

import Behavior from './behavior';

let center;

export default class FleeCenter extends Behavior {
  constructor() {
    super();
    this.angleForMove = new Phaser.Point();
  }

  added(entity) {
    if (!center) {
      center = {
        x: entity.game.world.centerX,
        y: entity.game.world.centerY
      };
    }
  }

  update(entity) {
    let player = entity.game.player;
    if (player && player.alive) {
      return;
    }
    // The +1 is a fudge factor to prevent distances of 0.
    let distance = entity.position.distance(center) + 1;
    if (distance > 160) {
      return;
    }
    this.angleForMove.set(entity.game.world.centerX - entity.x, entity.game.world.centerY - entity.y);
    // Again, prevents things right on top of center from not moving at all.
    // I mean, I'm glad you're happy to be in the center but you can't stay. sta
    if (this.angleForMove.x === 0 && this.angleForMove.y === 0) {
      this.angleForMove.x = Math.random() * 10 + 2;
      this.angleForMove.y = Math.random() * 10 + 2;
    }
    this.angleForMove.normalize();
    this.angleForMove.rotate(0, 0, 180, true);
    this.angleForMove.multiply(2000 / distance, 2000 / distance);
    entity.body.velocity.x = this.angleForMove.x;
    entity.body.velocity.y = this.angleForMove.y;
  }
}
