'use strict';

const BULLET_LIFETIME_MS = 2000;
const BULLET_MAIN_VELOCITY = 500;

export default class EnforcerBullet extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 4);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
    this.body.width = 4;
    this.body.height = 4;
    this.tint = game.tinting.currentTint;
  }

  update() {
    this.rotation += 0.1 * this.game.time.physicsElapsedMS;
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
