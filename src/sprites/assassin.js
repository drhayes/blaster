'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';
import KeepYourDistance from '../behaviors/keepYourDistance';

export default class Assassin extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 5);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new KeepYourDistance());

    this.anchor.set(0.5, 0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.bounce.set(0.4);
    this.body.collideWorldBounds = true;
    this.tint = 0xcb0404;

    this.health = 10;

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
    this.kill();
  }

  update() {
    this.behave('update');
  }
};
