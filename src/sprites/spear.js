'use strict';

var fs = require('fs');

const BULLET_LIFETIME_MS = 2000;
const BULLET_MAIN_VELOCITY = 1000;

export default class Spear extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 6);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
    this.body.width = 32;
    this.body.height = 3;
    this.body.bounce.set(0.9);
    this.body.collideWorldBounds = true;
    this.tint = game.tinting.currentTint;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }

  update() {
    this.rotation = this.game.math.angleBetweenPoints(this.previousPosition, this);
  }

  fire(velX, velY) {
    this.killEvent = this.game.time.events.add(BULLET_LIFETIME_MS, () => {
      this.kill();
    });
    this.body.velocity.x = BULLET_MAIN_VELOCITY * velX;
    this.body.velocity.y = BULLET_MAIN_VELOCITY * velY;
  }

  kill() {
    super.kill();
    this.game.time.events.remove(this.killEvent);
  }
}
