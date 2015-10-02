'use strict';

import Behavior from './behavior';

export default class TwirlMove extends Behavior {
  constructor() {
    super();
  }

  update(entity) {
    let rotationFactor = 0.1;
    if (entity.body.velocity.x || entity.body.velocity.y) {
      let maxVel = Math.max(Math.abs(entity.body.velocity.x), Math.abs(entity.body.velocity.y));
      rotationFactor *= maxVel / 20;
    }
    rotationFactor = Math.max(rotationFactor, 0.1);
    entity.angle += rotationFactor * entity.game.time.physicsElapsedMS;
  }
}
