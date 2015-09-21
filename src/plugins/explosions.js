'use strict';

const NUM_EXPLOSIONS = 60;
const EXPLOSION_LIFETIME_MS = 1000;
const SOUND_DELAY = 60;

export default class Explosions extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.explosions = this;
    this.boomSound = game.add.audio('smallBoom');
    this.boomSoundDelay = 0;
  }

  init() {
    let splosions = this.game.add.emitter(0, 0, NUM_EXPLOSIONS);
    splosions.makeParticles('player', 2);
    splosions.setAlpha(1, 0, EXPLOSION_LIFETIME_MS, Phaser.Easing.Quadratic.Out);
    splosions.setScale(1.5, 0.5, 1.5, 0.5, EXPLOSION_LIFETIME_MS);
    splosions.setRotation(0, 0);
    splosions.width = 8;
    splosions.height = 8;
    splosions.setAll('tint', 0xffff00);
    this.splosions = splosions;
  }

  update() {
    this.boomSoundDelay -= this.game.time.physicsElapsedMS;
  }

  fire(x, y) {
    this.splosions.x = x;
    this.splosions.y = y;
    this.splosions.start(true, EXPLOSION_LIFETIME_MS, null, 1);
    if (this.boomSoundDelay <= 0) {
      this.boomSound.play();
      this.boomSoundDelay = SOUND_DELAY + Math.random() * 10;
    }
  }
};
