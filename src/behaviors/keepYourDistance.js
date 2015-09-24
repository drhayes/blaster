'use strict';

import Behavior from './behavior';

const VELOCITY = 100;
const MIN_DISTANCE = 300;
const MAX_DISTANCE = 650;

export default class KeepYourDistance extends Behavior {
  constructor() {
    super();
    this.angleForMove = new Phaser.Point();
    this.direction = Math.random() < 0.5 ? 1 : -1;
  }

  update(entity) {
    let player = entity.game.player;
    if (!player || !player.alive) {
      return;
    }
    let distance = entity.position.distance(player);
    this.angleForMove.set(player.x - entity.x, player.y - entity.y);
    this.angleForMove.normalize();
    if (distance > MAX_DISTANCE) {
      // Move toward player.
      this.angleForMove.rotate(0, 0, 5 * this.direction, true);
      this.angleForMove.multiply(VELOCITY, VELOCITY);
    } else if (distance < MIN_DISTANCE) {
      // Move away from player.
      this.angleForMove.rotate(0, 0, 180, true);
      this.angleForMove.multiply(15000 / VELOCITY, 15000 / VELOCITY);
    } else {
      // Keep distance.
      this.angleForMove.rotate(0, 0, 90 * this.direction, true);
      this.angleForMove.multiply(VELOCITY, VELOCITY);
    }
    entity.body.velocity.x = this.angleForMove.x;
    entity.body.velocity.y = this.angleForMove.y;
  }
};
