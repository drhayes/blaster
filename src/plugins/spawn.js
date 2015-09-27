'use strict';

import Player from '../sprites/player';

const NUM_LIVES = 1;
const SPAWN_TIME_MS = 2000;
const SPAWN_DURATION_MS = 2000;
const SPAWN_SOUND_DURATION_MS = 890;

export default class Spawn {
  constructor(game) {
    this.game = game;
    game.spawn = this;
    game.player = null;
    this.spawnEvent = null;
    this.spawning = false;
    this.spawnSound = this.game.add.audio('playerSpawn');
    this.lives = NUM_LIVES - 1;
    this.onGameOver = new Phaser.Signal();
    this.playerImage = game.add.image(this.game.world.centerX, this.game.world.centerY, 'player', 0);
    this.playerImage.anchor.set(0.5);
    this.playerImage.visible = false;
    this.playerImage.tint = 0x4682b4;
    this.livesImage = game.add.tileSprite(365, 20, 32, 32, 'player', 0);
    this.livesImage.anchor.setTo(0, 0.5);
    this.livesImage.tint = 0x4682b4;
    this.livesImage.scale.setTo(0.8);
    this.livesImage.width = this.lives * 32;
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
    this.spawnEvent = null;
    this.spawning = true;
    this.playerImage.angle = 0;
    this.playerImage.alpha = 0;
    this.playerImage.visible = true;
    this.playerImage.scale.set(3);
    this.game.add.tween(this.playerImage).to({
      angle: 360,
      alpha: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true)
      .onComplete.add(this.spawn, this);
    this.game.add.tween(this.playerImage.scale).to({
      x: 1,
      y: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true);
    this.game.time.events.add(SPAWN_DURATION_MS - SPAWN_SOUND_DURATION_MS, () => {
      this.spawnSound.play();
    });
    this.livesImage.width = this.lives * 32;
  }

  die() {
    this.lives -= 1;
  }

  spawn() {
    this.spawning = false;
    this.playerImage.visible = false;
    if (!this.game.player) {
      this.game.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);
      this.game.add.existing(this.game.player);
    }
    this.game.player.reset(this.game.world.centerX, this.game.world.centerY);
    this.spawnEvent = null;
  }
};
