'use strict';

import Behavior from './behavior';
import EnforcerBullet from '../sprites/enforcerBullet';

const SHOOT_TIMER_MS = 2000;
const SECOND_SHOT_DELAY = 200;

export default class ShootPlayer extends Behavior {
  constructor() {
    super();
    this.shootTimer = 0;
    this.angleForShoot = new Phaser.Point(0, 0);
  }

  update(entity) {
    if (!entity.alive) {
      return;
    }
    this.shootTimer -= entity.game.time.physicsElapsedMS;
    let player = entity.game.player;
    if (!player || !player.alive) {
      this.shootTimer = SHOOT_TIMER_MS;
      return;
    }
    if (this.shootTimer <= 0) {
      this.shootTimer = SHOOT_TIMER_MS;
      // First shot.
      this.angleForShoot.set(player.x - entity.x, player.y - entity.y);
      Phaser.Point.normalize(this.angleForShoot, this.angleForShoot);
      entity.game.shooting.enforcerShoot(entity.x, entity.y, this.angleForShoot.x, this.angleForShoot.y);
      // Second shot.
      entity.game.time.events.add(SECOND_SHOT_DELAY, () => {
        this.angleForShoot.set(player.x - entity.x + player.body.velocity.x, player.y - entity.y + player.body.velocity.y);
        Phaser.Point.normalize(this.angleForShoot, this.angleForShoot);
        entity.game.shooting.enforcerShoot(entity.x, entity.y, this.angleForShoot.x, this.angleForShoot.y);
      });
    }
  }
};
