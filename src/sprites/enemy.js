'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';

export default class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.body.collideWorldBounds = true;
    this.tint = game.tinting.currentTint;
    this.knockback = 0.5;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }

  damage(amount) {
    if (this.alive) {
      this.health -= amount;
      if (this.health < 0) {
        this.alive = false;
        this.startDying();
      }
    }
  }

  startDying() {
    this.game.explosions.medium(this.x, this.y);
    this.game.score.killed(this);
    this.kill();
  }

  update() {
    this.behave('update');
  }
};
