'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import keyConfig, { KEYS } from '../keyConfig';
import keycode from 'keycode';

const POSITIONS = [
  { x: 0.5, y: 0.8 },
  { x: 0.5, y: 1.2 },
  { x: 0.2, y: 1 },
  { x: 0.8, y: 1 },
  { x: 1.5, y: 0.8 },
  { x: 1.5, y: 1.2 },
  { x: 1.2, y: 1 },
  { x: 1.8, y: 1 },
];

export default class Options extends BaseIntro {
  create() {
    super.create();

    let move = this.makeText(this.game.world.centerY, 'Move');
    move.x = this.game.world.centerX * 0.5;
    let shoot = this.makeText(this.game.world.centerY, 'Shoot');
    shoot.x = this.game.world.centerX * 1.5;

    KEYS.forEach((key, i) => {
      let pos = POSITIONS[i];
      let label = keycode.names[keyConfig[key]].toUpperCase();
      this[key] = this.makeButton(this.game.world.centerX * pos.x, this.game.world.centerY * pos.y, label, () => {
        this.listenFor(key);
      });
    });

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.4, 'Main Menu', () => {
      keyConfig.save();
      this.game.state.start('mainMenu');
    });
    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.6, 'Reset Defaults', () => {
      keyConfig.reset();
      this.updateButtonLabels();
    });

    tracking.options();
  }

  updateButtonLabels() {
    KEYS.forEach((key) => {
      this[key].buttonText.text = keycode.names[keyConfig[key]].toUpperCase();
    });
  }

  listenFor(key) {
    if (this.listeningFor) {
      let button = this[this.listeningFor];
      button.deselect();
    }
    this.listeningFor = key;
    if (this.listeningFor) {
      let button = this[this.listeningFor];
      button.select();
      this.game.input.keyboard.addCallbacks(this, this.onDown);
    }
  }

  update() {
    super.update();
    if (this.listeningFor) {
      let button = this[this.listeningFor];
      let letter = Math.round(Math.random() * 25) + 65;
      button.buttonText.text = keycode.names[letter].toUpperCase();
    }
  }

  onDown(e) {
    if (this.listeningFor) {
      let button = this[this.listeningFor];
      button.deselect();
      keyConfig[this.listeningFor] = e.keyCode;
    }
    this.updateButtonLabels();
    this.listeningFor = null;
    this.game.input.keyboard.onDownCallback = null;
  }
}
