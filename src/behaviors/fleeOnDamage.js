'use strict';

import Behavior from './behavior';

const VELOCITY = 100;

export default class FleeOnDamage extends Behavior {
  constructor() {
    super();
    this.angleForMove = new Phaser.Point();
    this.lowHealth = 0;
  }

  added(entity) {
    this.lowHealth = Math.round(entity.health / 2);
  }

  update(entity) {
    let player = entity.game.player;
    if (!player || !player.alive) {
      return;
    }
    if (entity.health > this.lowHealth) {
      return;
    }
    let distance = entity.position.distance(player);
    this.angleForMove.set(player.x - entity.x, player.y - entity.y);
    this.angleForMove.rotate(0, 0, 180, true);
    this.angleForMove.multiply(200 / distance, 200 / distance);
    entity.body.velocity.x = this.angleForMove.x;
    entity.body.velocity.y = this.angleForMove.y;
  }
};
