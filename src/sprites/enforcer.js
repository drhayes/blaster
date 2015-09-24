'use strict';

import Enemy from './enemy';
import TwirlMove from '../behaviors/twirlMove';
import OrbitPlayer from '../behaviors/orbitPlayer';
import ShootPlayer from '../behaviors/shootPlayer';
import FleeCenter from '../behaviors/fleeCenter';

export default class Enforcer extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'player', 3);

    this.addBehavior(new TwirlMove());
    this.addBehavior(new OrbitPlayer());
    this.addBehavior(new ShootPlayer());
    this.addBehavior(new FleeCenter());

    this.anchor.set(0.5, 0.6);
    this.body.width = 20;
    this.body.height = 30;
    this.body.bounce.set(0.4);

    this.health = 20;
  }
};
