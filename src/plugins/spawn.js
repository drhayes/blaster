'use strict';

import Player from '../sprites/player';

const SPAWN_TIME_MS = 2000;
const SPAWN_DURATION_MS = 2000;

export default class Spawn extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.spawn = this;
    this.spawnEvent = null;
    this.spawning = false;
  }

  init() {
    this.playerImage = game.add.image(this.game.world.centerX, this.game.world.centerY, 'player', 0);
    this.playerImage.anchor.set(0.5);
    this.playerImage.visible = false;
    this.playerImage.tint = 0x4682b4;
  }

  update() {
    if (this.spawnEvent || this.spawning) {
      return;
    }
    if (!this.game.player || !this.game.player.alive) {
      this.spawnEvent = this.game.time.events.add(SPAWN_TIME_MS, this.startSpawn, this);
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
