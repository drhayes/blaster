'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
import Guard from '../sprites/guard';
import Enforcer from '../sprites/enforcer';
import Assassin from '../sprites/assassin';
import Hulk from '../sprites/hulk';
import tracking from '../tracking';

let wavesData = yaml.safeLoad(fs.readFileSync(__dirname + '/wavesData.yaml', 'utf8'));

export default class Waves {
  constructor(game) {
    this.game = game;
    game.waves = this;

    this.current = 0;
    this.loaded = false;
    this.transitioning = false;
    this.onTransition = new Phaser.Signal();
    this.enemiesGroup = this.game.enemiesGroup = this.game.add.group();
    this.waveIndicator = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 90, 'computerPixelFont', 'Wave 1', 40);
    this.waveIndicator.anchor.setTo(0.5, 0);
    this.waveIndicator.align = 'center';
    this.waveIndicator.visible = false;
  }

  update() {
    if (!this.loaded) {
      this.loadCurrentWave();
    }
    let player = this.game.player;
    if (player) {
      this.game.physics.arcade.collide(player, this.enemiesGroup, player.onCollide, null, player);
    }
    if (!this.enemiesGroup.getFirstAlive() && this.loaded && !this.transitioning) {
      this.transitioning = true;
      this.game.time.events.add(1000, () => {
        this.game.player.kill();
        this.current += 1;
        this.loaded = false;
        this.transitioning = false;
        this.onTransition.dispatch();
      })
    }
  }

  loadCurrentWave() {
    this.loaded = true;
    // Paranoid security.
    this.enemiesGroup.removeAll();
    this.enemiesGroup.alpha = 1;
    let wave = wavesData[Phaser.Math.wrap(this.current, 0, wavesData.length)];
    if (!wave) {
      console.error('Uhhhh.... no wave data!', wavesData);
      return;
    }
    for (let i = 0; i < wave.g; i++) {
      this.enemiesGroup.add(new Guard(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    for (let i = 0; i < wave.e; i++) {
      this.enemiesGroup.add(new Enforcer(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    for (let i = 0; i < wave.a; i++) {
      this.enemiesGroup.add(new Assassin(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    for (let i = 0; i < wave.h; i++) {
      this.enemiesGroup.add(new Hulk(this.game, this.game.world.randomX, this.game.world.randomY));
    }
    this.waveIndicator.text = `Wave ${this.current + 1}`;
    this.waveIndicator.visible = true;
    this.game.time.events.add(1000, () => {
      this.waveIndicator.text = `Wave ${this.current + 1}
Get ready!`;
      this.game.time.events.add(2750, () => {
        this.waveIndicator.visible = false;
      })
    });

    tracking.newWave(this.current);
  }
};
