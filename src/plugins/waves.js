import Guard from '../sprites/guard';
import Enforcer from '../sprites/enforcer';
import Assassin from '../sprites/assassin';
import Hulk from '../sprites/hulk';
import tracking from '../tracking';

let wavesData = require('../data/wavesData.json');
console.log('How many waves? ', wavesData.length);

export default class Waves {
  constructor(game) {
    this.game = game;
    game.waves = this;

    this.current = 0;
    this.loaded = false;
    this.transitioning = false;
    this.onTransition = new Phaser.Signal();
    this.enemiesGroup = this.game.enemiesGroup = this.game.add.group();
    this.hulkGroup = this.game.hulkGroup = this.game.add.group();
    this.waveIndicator = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 90, 'computerPixelFont', 'Wave 1', 40);
    this.waveIndicator.anchor.setTo(0.5, 0);
    this.waveIndicator.align = 'center';
    this.waveIndicator.visible = false;
    this.game.world.bringToTop(this.waveIndicator);
  }

  update() {
    let player = this.game.player;
    if (player && this.game.waves.loaded) {
      this.game.physics.arcade.collide(player, this.enemiesGroup, player.onCollide, null, player);
      this.game.physics.arcade.collide(player, this.hulkGroup, player.onCollide, null, player);
    }

    if (!this.loaded && !this.loading) {
      this.loading = true;
      this.game.time.events.add(1000, () => {
        this.loadCurrentWave();
      });
    }

    if (this.loaded && !this.loading && !this.enemiesGroup.getFirstAlive()) {
      this.current++;
      this.loaded = false;
      this.onTransition.dispatch();
    }
  }

  // TODO: Make this not dumb and awful.
  loadCurrentWave() {
    this.loaded = false;
    // Paranoid security.
    this.enemiesGroup.removeAll();
    this.hulkGroup.removeAll();
    this.enemiesGroup.alpha = 1;
    this.hulkGroup.alpha = 1;
    let wave = wavesData[Phaser.Math.wrap(this.current, 0, wavesData.length)];
    if (!wave) {
      console.error('Uhhhh.... no wave data!', wavesData);
      return;
    }
    for (let i = 0; i < wave.g; i++) {
      let guard = new Guard(this.game, this.game.world.randomX, this.game.world.randomY);
      this.enemiesGroup.add(guard);
      this.game.spawn.startSpawn(guard, () => {
        this.loading = false;
        this.loaded = true;
      });
    }
    for (let i = 0; i < wave.e; i++) {
      let enforcer = new Enforcer(this.game, this.game.world.randomX, this.game.world.randomY);
      this.enemiesGroup.add(enforcer);
      this.game.spawn.startSpawn(enforcer, () => {
        this.loading = false;
        this.loaded = true;
      });
    }
    for (let i = 0; i < wave.a; i++) {
      let assassin = new Assassin(this.game, this.game.world.randomX, this.game.world.randomY);
      this.enemiesGroup.add(assassin);
      this.game.spawn.startSpawn(assassin, () => {
        this.loading = false;
        this.loaded = true;
      });
    }
    for (let i = 0; i < wave.h; i++) {
      let hulk = new Hulk(this.game, this.game.world.randomX, this.game.world.randomY);
      this.hulkGroup.add(hulk);
      this.game.spawn.startSpawn(hulk, () => {
        this.loading = false;
        this.loaded = true;
      });
    }
    this.waveIndicator.text = `Wave ${this.current + 1}`;
    this.waveIndicator.visible = true;
    this.game.time.events.add(1000, () => {
      this.waveIndicator.text = `Wave ${this.current + 1}
Get ready!`;
      this.game.time.events.add(2750, () => {
        this.waveIndicator.visible = false;
      });
    });

    tracking.newWave(this.current);
  }
}
