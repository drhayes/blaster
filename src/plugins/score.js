const EXTRA_LIFE = 10 * 1000;
const EXTRA_BOMB = 40 * 1000;
const NUM_SCORES = 10;

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
    this.extraBombSound = this.game.add.audio('extraBomb');

    this.scorePool = this.game.add.group();
    for (let i = 0; i < NUM_SCORES; i++) {
      let scoreText = this.game.add.bitmapText(0, 0, 'computerPixelFont', '0', 24);
      scoreText.anchor.set(0.5);
      scoreText.alive = scoreText.exists = scoreText.visible = false;
      this.scorePool.addChild(scoreText);
    }
  }

  updateScore() {
    // Stick commas in as the thousands separator.
    this.scoreText.text = this.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  killed(thing) {
    if (this.current % EXTRA_LIFE > (this.current + thing.score) % EXTRA_LIFE) {
      this.game.lives.lives++;
      this.game.lives.updateLivesImage();
      this.extraLifeSound.play();
    }
    if (this.current % EXTRA_BOMB > (this.current + thing.score) % EXTRA_BOMB) {
      this.game.bombs.count++;
      this.game.bombs.updateBombsImage();
      this.extraBombSound.play();
    }
    let score = this.scorePool.getFirstExists(false);
    if (score) {
      score.reset(thing.x, thing.y);
      score.text = thing.score;
      this.game.add.tween(score).to({
        y: thing.y - 30
      }, 1000, Phaser.Easing.Quadratic.Out, true)
        .onComplete.add(() => {
          score.kill();
        });
    }
    this.current += thing.score;
    this.updateScore();
  }
}
