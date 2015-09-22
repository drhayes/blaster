'use strict';

import Behavior from './behavior';

export default class TwirlMove extends Behavior {
  constructor() {
    super();
  }

  update(entity) {
    let rotationFactor = 0.1;
    entity.angle += rotationFactor * entity.game.time.physicsElapsedMS;
  }
};
