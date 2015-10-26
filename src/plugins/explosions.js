const NUM_EXPLOSIONS = 100;
const EXPLOSION_LIFETIME_MS = 1000;
const SOUND_DELAY = 60;

export default class Explosions {
  constructor(game) {
    this.game = game;
    game.explosions = this;

    this.smallBoom = game.add.audio('smallBoom');
    this.smallBoomDelay = 0;
    this.mediumBoom = game.add.audio('mediumBoom');

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

    let bitsExplosions = this.game.add.emitter(0, 0, NUM_EXPLOSIONS);
    bitsExplosions.makeParticles('player', 1);
    bitsExplosions.setAlpha(1, 0, EXPLOSION_LIFETIME_MS * 3, Phaser.Easing.Quadratic.Out);
    bitsExplosions.setScale(2, 1, 2, 1, EXPLOSION_LIFETIME_MS);
    bitsExplosions.setRotation(0, 1);
    bitsExplosions.width = 1;
    bitsExplosions.height = 1;
    bitsExplosions.setAll('tint', 0xffff00);
    bitsExplosions.setAll('body.allowGravity', false);
    this.bitsExplosions = bitsExplosions;
  }

  update() {
    this.smallBoomDelay -= this.game.time.physicsElapsedMS;
  }

  bits(x, y, num) {
    num = num || 20;
    this.bitsExplosions.x = x;
    this.bitsExplosions.y = y;
    this.bitsExplosions.start(true, EXPLOSION_LIFETIME_MS, null, num);
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
    this.bits(x, y);
    this.mediumBoom.play();
  }
}
