'use strict';

export default class BaseIntro extends Phaser.State {
  makeText(y, text, size) {
    size = size || 40;
    let textThing = this.game.add.bitmapText(this.game.world.centerX, y, 'computerPixelFont', text, size);
    textThing.anchor.setTo(0.5, 0.5);
    textThing.align = 'center';
    return textThing;
  }

  makeCircuitBackground() {
    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.1;
  }

  makeBlasterLogo() {
    this.logo = this.game.add.image(this.game.world.centerX, 50, 'blasterLogo');
    this.logo.anchor.setTo(0.5, 0);
    this.logo.tint = 0x4682b4;
    this.alphaText = this.makeText(this.game.world.centerY * 1/3, 'alpha', 24);
  }

  create() {
    this.makeCircuitBackground();
    this.makeBlasterLogo();
  }

  update() {
    this.back.tilePosition.x += -0.1 * this.game.time.physicsElapsedMS;
  }
}
