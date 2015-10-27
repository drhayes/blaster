import keycode from 'keycode';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import keyConfig, { KEYS } from '../keyConfig';

export default class Instructions extends BaseIntro {
  create() {
    super.create();

    this.makeText(this.game.world.centerY * 0.5, 'Shoot everything. Know your enemy.');

    let moveKeys = KEYS.filter((key) => key.indexOf('move') !== -1);
    let moveLabels = moveKeys.map((key) => keycode.names[keyConfig[key]].toUpperCase()).join(', ');
    this.makeText(this.game.world.centerY * 0.6, `${moveLabels} to move.`);

    let shootKeys = KEYS.filter((key) => key.indexOf('shoot') !== -1);
    let shootLabels = shootKeys.map((key) => keycode.names[keyConfig[key]].toUpperCase()).join(', ');
    this.makeText(this.game.world.centerY * 0.7, `${shootLabels} to shoot.`);

    this.makeText(this.game.world.centerY * 0.8, 'Extra life every 10,000.');
    this.makeText(this.game.world.centerY * 0.8, 'Extra bomb every 40,000.');

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.4, 'Main Menu', () => {
      this.game.state.start('mainMenu');
    });

    tracking.instructions();
  }
}
