'use strict';

import Behavior from './behavior';

export default class TouchAndDie extends Behavior {
  constructor() {
    super();
  }

  onCollide(entity) {
    entity.game.explosions.medium(entity.x, entity.y);
    entity.kill();
    entity.game.lives.die();
  }
}
