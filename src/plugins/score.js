'use strict';

const EXTRA_LIFE = 7500;

export default class Score {
  constructor(game) {
    this.game = game;
    game.score = this;
    this.current = 0;
    this.scoreText = this.game.add.bitmapText(360, 20, 'computerPixelFont', '0', 40);
    this.scoreText.anchor.setTo(1, 0.3);
    this.scoreText.align = 'right';
    this.game.world.bringToTop(this.scoreText);
    this.updateScore();
    this.extraLifeSound = this.game.add.audio('extraLife');
  }

  updateScore() {
    // Stick commas in as the thousands separator.
    this.scoreText.text = this.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  killed(thing) {
    if (this.current % EXTRA_LIFE > (this.current + thing.score) % EXTRA_LIFE) {
      this.game.spawn.lives++;
      this.game.spawn.updateLivesImage();
      this.extraLifeSound.play();
    }
    this.current += thing.score;
    this.updateScore();
  }
};
