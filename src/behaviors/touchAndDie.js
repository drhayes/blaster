'use strict';

import Behavior from './behavior';

export default class TouchAndDie extends Behavior {
  constructor() {
    super();
  }

  onCollide(entity, other) {
    if (!other.alive) {
      return;
    }
    entity.game.explosions.medium(entity.x, entity.y);
    entity.kill();
    entity.game.lives.die();
  }
}
