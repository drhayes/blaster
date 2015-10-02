'use strict';

export default class Tinting {
  constructor(game) {
    this.game = game;
    game.tinting = this;
    this.tints = [
      0xcb0404, // #cb0404
      0x3cbd0e, // #3cbd0e
      0xbb04cb, // #bb04cb
      0xcb6f04, // #cb6f04
      0x8bcb04 // #8bcb04
    ];
    this.currentTint = this.tints[Math.floor(game.waves.current / 3) % this.tints.length];
    game.waves.onTransition.add(() => {
      this.currentTint = this.tints[Math.floor(game.waves.current / 3) % this.tints.length];
    });
  }
}
