'use strict';

import Behavior from './behavior';

const ANGLE_RATIO = 0.05;

export default class TiltMove extends Behavior {
  constructor() {
    super();
  }

  update(entity) {
    entity.angle = ANGLE_RATIO * entity.body.velocity.x;
  }
}
