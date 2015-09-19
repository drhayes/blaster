'use strict';

var fs = require('fs');

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.anchor.setTo(0.5);
    this.glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [this.glow];

    this.angle = 1;
  }

  update() {
    // this.angle += 1;
    // this.x += 1;
  }
};
