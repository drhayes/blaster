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

    this.logo = this.game.add.image(this.game.world.centerX, 50, 'blasterLogo');
    this.logo.anchor.setTo(0.5, 0);
    this.logo.scale.set(2.3);

    this.alphaText = this.makeText(310, 'alpha');

    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY, 'New Game', () => {
      this.game.state.start('main');
    }));

    this.x = -0.1;
    this.y = 0;

    tracking.mainMenu();
  }

  update() {
    this.back.tilePosition.x += this.x * this.game.time.physicsElapsedMS;
    this.back.tilePosition.y += this.y * this.game.time.physicsElapsedMS;
    if (Math.random() < 0.02) {
      if (Math.random() < 0.5) {
        this.x = 0;
        this.y = Math.random() < 0.5 ? 0.1 : -0.1;
      } else {
        this.y = 0;
        this.x = Math.random() < 0.5 ? 0.1 : -0.1;
      }
    }
  }
};
