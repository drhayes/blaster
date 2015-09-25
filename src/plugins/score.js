'use strict';

import Assassin from '../sprites/assassin';
import Enforcer from '../sprites/enforcer';
import Guard from '../sprites/guard';

export default class Score extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.score = this;
    this.current = 0;
  }

  init() {
    this.scoreText = this.game.add.bitmapText(360, 10, 'computerPixelFont', '0', 40);
    this.scoreText.anchor.setTo(1, 0);
    this.scoreText.align = 'right';
    this.updateScore();
  }

  updateScore() {
    // Stick commas in as the thousands separator.
    this.scoreText.text = this.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  killed(thing) {
    this.current += thing.score;
    this.updateScore();
  }
};
