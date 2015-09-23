'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';
import TiltMove from '../behaviors/tiltMove';
import March from '../behaviors/march';
import FleeCenter from '../behaviors/fleeCenter';

const NUM_STEPS = 5;
const STEP_LIFETIME_MS = 1600;
const STEP_FREQUENCY_MS = 500;

export default class Guard extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new TiltMove());
    this.addBehavior(new March());
    this.addBehavior(new FleeCenter());

    this.anchor.setTo(0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.bounce.set(1);
    this.body.collideWorldBounds = true;
    this.tint = 0xcb0404;

    this.health = 30;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }

  damage(amount) {
    if (this.alive) {
      this.health -= amount;
      if (this.health < 0) {
        this.alive = false;
        this.startDying();
      }
    }
  }

  startDying() {
    this.game.explosions.medium(this.x, this.y);
    this.kill();
  }

  update() {
    this.behave('update');
  }
};
