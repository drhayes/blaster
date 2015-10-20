'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';

export default class Instructions extends BaseIntro {
  create() {
    super.create();

    this.makeText(this.game.world.centerY * 0.5, 'Shoot everything. Know your enemy.');
    this.makeText(this.game.world.centerY * 0.6, 'Extra life every 10,000.');
    // TODO: Read key configuration and play it back here: WASD to move, IJKL to shoot.

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.4, 'Main Menu', () => {
      this.game.state.start('mainMenu');
    });

    tracking.instructions();
  }
}
