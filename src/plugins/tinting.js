'use strict';

export default class Tinting extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.tinting = this;
    this.tints = [
      0xcb0404, // #cb0404
      0x3cbd0e, // #3cbd0e
      0xbb04cb, // #bb04cb
      0xcb6f04, // #cb6f04
      0x8bcb04, // #8bcb04
    ];
    this.currentTint = Phaser.ArrayUtils.getRandomItem(this.tints);
  }
};
