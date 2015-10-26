import Behavior from './behavior';

const MAX_VEL = 200;
const SLEEP_TIME_MS = 200;
const MOVE_TIME_MS = 200;
const EPSILON = 20;

export default class March extends Behavior {
  constructor() {
    super();
    this.moveTime = Math.random() * MOVE_TIME_MS;
    this.sleepTime = 0;
  }

  added(entity) {
    entity.body.maxVelocity.set(MAX_VEL);
    this.marchSound = entity.game.add.audio('march');
  }

  update(entity) {
    if (!entity.alive) {
      return;
    }
    let player = entity.game.player;
    if (!player || !player.alive) {
      entity.body.velocity.set(0);
      return;
    }
    let velX = 0;
    let velY = 0;

    if (this.moveTime <= 0 && this.sleepTime <= 0) {
      this.moveTime = MOVE_TIME_MS + Math.random() * MOVE_TIME_MS;
      this.marchSound.play();
    }
    this.moveTime -= entity.game.time.physicsElapsedMS;
    this.sleepTime -= entity.game.time.physicsElapsedMS;

    if (this.moveTime > 0) {
      this.sleepTime = SLEEP_TIME_MS + Math.random() * SLEEP_TIME_MS;
      if (!Phaser.Math.fuzzyEqual(player.y, entity.y, EPSILON)) {
        if (player.y < entity.y) {
          velY = -MAX_VEL;
        } else {
          velY = MAX_VEL;
        }
      }
      if (!Phaser.Math.fuzzyEqual(player.x, entity.x, EPSILON)) {
        if (player.x < entity.x) {
          velX = -MAX_VEL;
        } else {
          velX = MAX_VEL;
        }
      }
    }
    entity.body.velocity.x = velX;
    entity.body.velocity.y = velY;
  }
}
