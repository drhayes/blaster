'use strict';

export default class Score {
  constructor(game) {
    this.game = game;
    game.score = this;
    this.current = 0;
    this.scoreText = this.game.add.bitmapText(360, 20, 'computerPixelFont', '0', 40);
    this.scoreText.anchor.setTo(1, 0.3);
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
