'use strict';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.anchor.setTo(0.5);
    // this.angle = 1;
  }

  update() {
    // this.angle += 1;
    // this.x += 1;
  }
};
