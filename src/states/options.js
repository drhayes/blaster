'use strict';

import BaseIntro from './baseIntro';
import tracking from '../tracking';
import keyConfig from '../keyConfig';

export default class Options extends BaseIntro {
  create() {
    super.create();

    let move = this.makeText(this.game.world.centerY, 'Move');
    move.x = this.game.world.centerX * 0.5;
    let shoot = this.makeText(this.game.world.centerY, 'Shoot');
    shoot.x = this.game.world.centerX * 1.5;

    let moveUp = this.makeButton(this.game.world.centerX * 0.5, this.game.world.centerY * 0.8, 'W', () => {
      console.log('blah!');
    });
    let moveDown = this.makeButton(this.game.world.centerX * 0.5, this.game.world.centerY * 1.2, 'S', () => {
      console.log('blah!');
    });
    let moveLeft = this.makeButton(this.game.world.centerX * 0.2, this.game.world.centerY, 'A', () => {
      console.log('blah!');
    });
    let moveRight = this.makeButton(this.game.world.centerX * 0.8, this.game.world.centerY, 'D', () => {
      console.log('blah!');
    });

    let shootUp = this.makeButton(this.game.world.centerX * 1.5, this.game.world.centerY * 0.8, 'I', () => {
      console.log('blah!');
    });
    let shootDown = this.makeButton(this.game.world.centerX * 1.5, this.game.world.centerY * 1.2, 'K', () => {
      console.log('blah!');
    });
    let shootLeft = this.makeButton(this.game.world.centerX * 1.2, this.game.world.centerY, 'J', () => {
      console.log('blah!');
    });
    let shootRight = this.makeButton(this.game.world.centerX * 1.8, this.game.world.centerY, 'L', () => {
      console.log('blah!');
    });

    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.4, 'Main Menu', () => {
      keyConfig.save();
      this.game.state.start('mainMenu');
    });
    this.makeButton(this.game.world.centerX, this.game.world.centerY * 1.6, 'Reset Defaults', () => {
      keyConfig.reset();
    });

    tracking.options();
  }
}
