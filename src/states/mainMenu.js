'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import BlasterButton from '../sprites/blasterButton';

export default class MainMenu extends BaseIntro {
  create() {
    super.create();

    let space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceBinding = space.onDown.addOnce(() => {
      this.game.state.start('main');
    });

    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY * .8, 'New Game', () => {
      this.game.state.start('main');
    }));
    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY, 'Options', () => {
      this.game.state.start('options');
    }));
    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY * 1.2, 'Instructions', () => {
      this.game.state.start('instructions');
    }));

    this.pressSpace = this.makeText(this.game.world.centerY * 1.8, 'Press Space For New Game');

    tracking.mainMenu();
  }

  shutdown() {
    if (this.spaceBinding) {
      this.spaceBinding.detach();
    }
  }
}
