'use strict';

// const SPAWN_TIME_MS = 2000;
const SPAWN_DURATION_MS = 2000;
// const SPAWN_SOUND_DURATION_MS = 890;

export default class Spawn {
  constructor(game) {
    this.game = game;
    game.spawn = this;
    // this.spawnSound = this.game.add.audio('playerSpawn');
  }

  startSpawn(thing, callback) {
    thing.angle = 0;
    thing.alpha = 0;
    thing.alive = false;
    thing.visible = true;
    thing.scale.set(3);
    this.game.add.tween(thing).to({
      angle: 360,
      alpha: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true)
      .onComplete.add(() => {
        thing.alive = true;
        if (callback) {
          callback();
        }
      });
    this.game.add.tween(thing.scale).to({
      x: 1,
      y: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true);
  }
}
