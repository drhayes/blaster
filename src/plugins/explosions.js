'use strict';

const NUM_EXPLOSIONS = 100;
const EXPLOSION_LIFETIME_MS = 1000;
const SOUND_DELAY = 60;

export default class Explosions extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.explosions = this;
    this.smallBoom = game.add.audio('smallBoom');
    this.smallBoomDelay = 0;
    this.mediumBoom = game.add.audio('mediumBoom');
  }

  init() {
    let smallExplosions = this.game.add.emitter(0, 0, NUM_EXPLOSIONS);
    smallExplosions.makeParticles('player', 2);
    smallExplosions.setAlpha(1, 0, EXPLOSION_LIFETIME_MS, Phaser.Easing.Quadratic.Out);
    smallExplosions.setScale(1.5, 0.5, 1.5, 0.5, EXPLOSION_LIFETIME_MS);
    smallExplosions.setRotation(0, 0);
    smallExplosions.width = 4;
    smallExplosions.height = 4;
    smallExplosions.setAll('tint', 0xffff00);
    this.smallExplosions = smallExplosions;

    let mediumExplosions = this.game.add.emitter(0, 0, NUM_EXPLOSIONS);
    mediumExplosions.makeParticles('player', 0);
    mediumExplosions.setAlpha(1, 0, EXPLOSION_LIFETIME_MS, Phaser.Easing.Quadratic.Out);
    mediumExplosions.setScale(1, 3, 1, 3, EXPLOSION_LIFETIME_MS);
    mediumExplosions.setRotation(0, Math.PI / 2);
    mediumExplosions.width = 1;
    mediumExplosions.height = 1;
    mediumExplosions.setAll('tint', 0xffff00);
    this.mediumExplosions = mediumExplosions;
  }

  update() {
    this.smallBoomDelay -= this.game.time.physicsElapsedMS;
  }

  small(x, y, num) {
    num = num || 1;
    this.smallExplosions.x = x;
    this.smallExplosions.y = y;
    this.smallExplosions.start(true, EXPLOSION_LIFETIME_MS, null, num);
    if (this.smallBoomDelay <= 0) {
      this.smallBoom.play();
      this.smallBoomDelay = SOUND_DELAY + Math.random() * 10;
    }
  }

  medium(x, y) {
    this.mediumExplosions.x = x;
    this.mediumExplosions.y = y;
    this.mediumExplosions.start(true, EXPLOSION_LIFETIME_MS, null, 5);
    this.mediumBoom.play();
  }
};
