'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';
import TiltMove from '../behaviors/tiltMove';

export default class Guard extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new TiltMove());

    this.anchor.setTo(0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.collideWorldBounds = true;
    this.tint = 0xcb0404;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }

  update() {
    this.behave('update');
  }
};
