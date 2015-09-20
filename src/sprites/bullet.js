'use strict';

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 1);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
    this.body.width = 4;
    this.body.height = 2;
    this.body.collideWorldBounds = true;
    this.tint = 0x4682b4;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }
};
