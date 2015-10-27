const SPAWN_DURATION_MS = 3000;

export default class Spawn {
  constructor(game) {
    this.game = game;
    game.spawn = this;
  }

  startSpawn(thing, callback) {
    thing.angle = 0;
    thing.alpha = 0;
    thing.alive = false;
    thing.visible = true;
    thing.scale.set(3);
    this.game.add.tween(thing).to({
      angle: 360
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true)
      .onComplete.add(() => {
        thing.alive = true;
        if (callback) {
          callback();
        }
      });
    this.game.add.tween(thing).to({
      alpha: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.In, true);
    this.game.add.tween(thing.scale).to({
      x: 1,
      y: 1
    }, SPAWN_DURATION_MS, Phaser.Easing.Quadratic.Out, true);
  }
}
