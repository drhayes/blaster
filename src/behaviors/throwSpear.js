'use strict';

import Behavior from './behavior';
import Spear from '../sprites/spear';

const SHOOT_TIMER_MS = 5000;

export default class ShootPlayer extends Behavior {
  constructor() {
    super();
    this.shootTimer = 0;
    this.angleForShoot = new Phaser.Point(0, 0);
    this.warned = false;
  }

  added(entity) {
    this.currentTint = entity.tint;
  }

  update(entity) {
    if (!entity.alive) {
      return;
    }
    this.shootTimer -= entity.game.time.physicsElapsedMS;
    let player = entity.game.player;
    if (!player || !player.alive) {
      this.shootTimer = SHOOT_TIMER_MS + Math.random() * SHOOT_TIMER_MS;
      return;
    }
    // The length of the "spearWarn" sound in MS.
    if (this.shootTimer <= 906 && !this.warned) {
      entity.tint = 0xffffff;
      entity.game.shooting.spearWarn();
      this.warned = true;
    }
    if (this.shootTimer <= 0) {
      this.shootTimer = SHOOT_TIMER_MS + Math.random() * SHOOT_TIMER_MS;
      this.warned = false;
      entity.tint = this.currentTint;
      // First shot.
      this.angleForShoot.set(player.x - entity.x, player.y - entity.y);
      Phaser.Point.normalize(this.angleForShoot, this.angleForShoot);
      entity.game.shooting.throwSpear(entity.x, entity.y, this.angleForShoot.x, this.angleForShoot.y);
    }
  }
};
