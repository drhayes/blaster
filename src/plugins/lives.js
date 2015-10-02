'use strict';

import Player from '../sprites/player';
import tracking from '../tracking';

const NUM_LIVES = 5;
const SPAWN_TIME_MS = 2000;
const SPAWN_DURATION_MS = 2000;
const SPAWN_SOUND_DURATION_MS = 890;

export default class Lives {
  constructor(game) {
    this.game = game;
    game.lives = this;
    game.player = null;
    this.spawnEvent = null;
    this.spawning = false;
    this.spawnSound = this.game.add.audio('playerSpawn');
    this.lives = NUM_LIVES - 1;
    this.onGameOver = new Phaser.Signal();
    this.livesImage = game.add.tileSprite(365, 20, 32, 32, 'player', 0);
    this.livesImage.anchor.setTo(0, 0.5);
    this.livesImage.tint = 0x4682b4;
    this.livesImage.scale.setTo(0.8);
    this.updateLivesImage();
    this.game.world.bringToTop(this.livesImage);
  }

  update() {
    if (this.spawnEvent || this.spawning) {
      return;
    }
    if ((!this.game.player || !this.game.player.alive) && this.lives >= 0) {
      this.spawnEvent = this.game.time.events.add(SPAWN_TIME_MS, this.startSpawn, this);
    }
    if ((!this.game.player || !this.game.player.alive) && this.lives < 0) {
      this.onGameOver.dispatch();
    }
  }

  startSpawn() {
    this.game.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);
    this.game.add.existing(this.game.player);
    this.game.spawn.startSpawn(this.game.player, () => {
      this.spawning = false;
      this.spawnEvent = null;
    });
    this.updateLivesImage();
  }

  updateLivesImage() {
    this.livesImage.width = this.lives * 32;
  }

  die() {
    this.lives -= 1;
    tracking.died(this.game.waves.current, this.lives);
  }
}
