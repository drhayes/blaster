'use strict';

import Enemy from './enemy';
import HulkMarch from '../behaviors/hulkMarch';
import FleeCenter from '../behaviors/fleeCenter';

export default class Hulk extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'player', 7);

    this.addBehavior(new HulkMarch());
    this.addBehavior(new FleeCenter());

    this.anchor.set(0.5, 0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.bounce.set(0.1);
    this.knockback = 0.2;

    // This doesn't matter because hulks don't take damage.
    this.health = 150;
    this.score = 1750;
  }

  // Spooky! Hulks take no damage.
  damage() {}
};
