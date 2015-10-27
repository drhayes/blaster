import keycode from 'keycode';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import BlasterButton from '../sprites/blasterButton';
import keyConfig, { KEYS } from '../keyConfig';

export default class MainMenu extends BaseIntro {
  create() {
    super.create();

    let space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceBinding = space.onDown.addOnce(() => {
      this.game.state.start('main');
    });

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 0.8, 'New Game', () => {
      this.game.state.start('main');
    });
    this.makeButton(this.game.world.centerX, this.game.world.centerY, 'Options', () => {
      this.game.state.start('options');
    });
    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.2, 'Instructions', () => {
      this.game.state.start('instructions');
    });

    let moveKeys = KEYS.filter((key) => key.indexOf('move') !== -1);
    let moveLabels = moveKeys.map((key) => keycode.names[keyConfig[key]].toUpperCase()).join(', ');
    this.makeText(this.game.world.centerY * 1.5, `${moveLabels} to move.`);

    let shootKeys = KEYS.filter((key) => key.indexOf('shoot') !== -1);
    let shootLabels = shootKeys.map((key) => keycode.names[keyConfig[key]].toUpperCase()).join(', ');
    this.makeText(this.game.world.centerY * 1.6, `${shootLabels} to shoot.`);

    this.makeText(this.game.world.centerY * 1.7, `${keycode.names[keyConfig.bomb].toUpperCase()} for bomb.`);


    this.pressSpace = this.makeText(this.game.world.centerY * 1.9, 'Press Space For New Game');

    tracking.mainMenu();
  }

  shutdown() {
    if (this.spaceBinding) {
      this.spaceBinding.detach();
    }
  }
}
