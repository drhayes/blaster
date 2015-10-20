'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';

export default class Options extends BaseIntro {
  create() {
    super.create();

    // makeText(y, text, size) {
    let move = this.makeText(this.game.world.centerY, 'Move');
    move.x = this.game.world.centerX * 0.4;
    let shoot = this.makeText(this.game.world.centerY, 'Shoot');
    shoot.x = this.game.world.centerX * 1.6;

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.4, 'Main Menu', () => {
      this.game.state.start('mainMenu');
    });

    tracking.options();
  }
}
