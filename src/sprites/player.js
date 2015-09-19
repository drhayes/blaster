'use strict';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.glow = new Phaser.Filter(game, null, require('../shaders/glow.frag'));
    this.filters = [this.glow];
  }
};
