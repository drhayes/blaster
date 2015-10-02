'use strict';

import Enemy from './enemy';
import TiltMove from '../behaviors/tiltMove';
import March from '../behaviors/march';
import FleeCenter from '../behaviors/fleeCenter';

export default class Guard extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);

    this.addBehavior(new TiltMove());
    this.addBehavior(new March());
    this.addBehavior(new FleeCenter());

    this.anchor.setTo(0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.bounce.set(1);

    this.health = 30;
    this.score = 200;
  }
}
