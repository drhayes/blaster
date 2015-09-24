'use strict';

import Enemy from './enemy';
import KeepYourDistance from '../behaviors/keepYourDistance';
import FleeOnDamage from '../behaviors/fleeOnDamage';
import FleeCenter from '../behaviors/fleeCenter';
import ThrowSpear from '../behaviors/throwSpear';

export default class Assassin extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'player', 5);

    this.addBehavior(new KeepYourDistance());
    this.addBehavior(new FleeOnDamage());
    this.addBehavior(new FleeCenter());
    this.addBehavior(new ThrowSpear());

    this.anchor.set(0.5, 0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.bounce.set(0.4);

    this.health = 10;
  }
};
