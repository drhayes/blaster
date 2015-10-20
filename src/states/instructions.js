'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import BlasterButton from '../sprites/blasterButton';

export default class Instructions extends BaseIntro {
  create() {
    super.create();

    // makeText(y, text, size) {
    this.makeText(this.game.world.centerY * 0.5, 'Shoot everything. Know your enemy.');
    this.makeText(this.game.world.centerY * 0.6, 'Extra life every 10,000.');

    this.game.add.existing(new BlasterButton(this.game, this.game.world.centerX, this.game.world.centerY * 1.2, 'Main Menu', () => {
      this.game.state.start('mainMenu');
    }));


    tracking.instructions();
  }
}
