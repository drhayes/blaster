'use strict';

var fs = require('fs');
import enableBehaviors from '../behaviors/enableBehaviors';
import PlayerMove from '../behaviors/playerMove';
import PlayerShoot from '../behaviors/playerShoot';

export default class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    game.physics.arcade.enable(this);
    enableBehaviors(this);

    this.addBehavior(new PlayerMove());
    this.addBehavior(new PlayerShoot());
    this.anchor.setTo(0.5);
    this.body.width = 30;
    this.body.height = 30;
    this.body.collideWorldBounds = true;
    this.tint = 0x4682b4;

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    this.filters = [glow];
  }

  update() {
    this.behave('update');
  }
};
