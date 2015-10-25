'use strict';

import enableBehaviors from '../behaviors/enableBehaviors';
import TiltMove from '../behaviors/tiltMove';
import PlayerMove from '../behaviors/playerMove';
import PlayerShoot from '../behaviors/playerShoot';
import PlayerBomb from '../behaviors/playerBomb';
import TouchAndDie from '../behaviors/touchAndDie';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new TiltMove());
    this.addBehavior(new PlayerMove());
    this.addBehavior(new PlayerShoot(game.shooting.pool));
    this.addBehavior(new PlayerBomb());
    this.addBehavior(new TouchAndDie());

    this.anchor.setTo(0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.collideWorldBounds = true;
    this.tint = 0x4682b4;
  }

  update() {
    if (!this.alive) {
      return;
    }
    this.behave('update');
  }

  render() {
    super.render();
    this.behave('render');
  }

  onCollide(player, other) {
    this.behave('onCollide', other);
  }
}
