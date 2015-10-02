'use strict';

var fs = require('fs');

const BULLET_LIFETIME_MS = 1000;
const BULLET_MAIN_VELOCITY = 1000;

export default class Bullet extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 1);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
    this.body.width = 4;
    this.body.height = 2;
    this.tint = 0x4682b4;

    this.attack = 2;

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
