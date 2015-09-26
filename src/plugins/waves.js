'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
import Guard from '../sprites/guard';
import Enforcer from '../sprites/enforcer';
import Assassin from '../sprites/assassin';

let wavesData = yaml.safeLoad(fs.readFileSync(__dirname + '/wavesData.yaml', 'utf8'));

export default class Waves extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.waves = this;

    this.current = 0;
    this.loaded = false;
  }

  init() {
    this.enemiesGroup = this.game.enemiesGroup = this.game.add.group();
  }

  update() {
    if (!this.loaded) {
      this.loadCurrentWave();
    }
    let player = this.game.player;
    if (player) {
      this.game.physics.arcade.collide(player, this.enemiesGroup, player.onCollide, null, player);
    }
  }

  loadCurrentWave() {
    this.loaded = true;
    // Paranoid security.
    this.enemiesGroup.removeAll();
    this.enemiesGroup.alpha = 1;
    let wave = wavesData[this.current];
    for (let i = 0; i < wave.guards; i++) {
      this.enemiesGroup.add(new Guard(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    for (let i = 0; i < wave.enforcers; i++) {
      this.enemiesGroup.add(new Enforcer(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    for (let i = 0; i < wave.assassins; i++) {
      this.enemiesGroup.add(new Assassin(this.game, this.game.world.randomX, this.game.world.randomY));
    }
  }
};
