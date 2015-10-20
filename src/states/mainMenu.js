'use strict';

import tracking from '../tracking';
import BlasterButton from '../sprites/blasterButton';

export default class MainMenu extends Phaser.State {
  makeText(y, text, size) {
    size = size || 40;
    let textThing = this.game.add.bitmapText(this.game.world.centerX, y, 'computerPixelFont', text, size);
    textThing.anchor.setTo(0.5, 0.5);
    textThing.align = 'center';
    return textThing;
  }

  create() {
    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.1;

    let logo = this.game.add.image(this.game.world.centerX, 50, 'blasterLogo');
    logo.anchor.setTo(0.5, 0);
    logo.tint = 0x4682b4;

    this.alphaText = this.makeText(this.game.world.centerY * 1/3, 'alpha', 24);

    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY * .8, 'New Game', () => {
      this.game.state.start('main');
    }));
    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY, 'Options', () => {
      console.log('options!');
    }));
    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY * 1.2, 'Instructions', () => {
      console.log('instructions');
    }))

    tracking.mainMenu();
  }

  update() {
    this.back.tilePosition.x += -0.1 * this.game.time.physicsElapsedMS;
  }
}
