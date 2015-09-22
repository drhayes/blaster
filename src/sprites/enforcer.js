'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';
import TwirlMove from '../behaviors/twirlMove';
import OrbitPlayer from '../behaviors/orbitPlayer';

export default class Enforcer extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 3);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new TwirlMove());
    this.addBehavior(new OrbitPlayer());

    this.anchor.set(0.5, 0.6);
    this.body.width = 20;
    this.body.height = 30;
    this.body.collideWorldBounds = true;
    this.tint = 0xcb0404;

    this.health = 20;

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
