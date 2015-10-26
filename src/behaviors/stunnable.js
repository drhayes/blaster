import Behavior from './behavior';

const STUN_TIMER_MS = 1200;

export default class Stunnable extends Behavior {
  constructor() {
    super();
  }

  added(entity) {
    this.originalTint = entity.tint;
    entity.stun = () => {
      entity.stunned = true;
      entity.tint = 0x777777;
      this.stunTimer = STUN_TIMER_MS;
    }
  }

  update(entity) {
    if (entity.stunned) {
      this.stunTimer -= entity.game.time.physicsElapsedMS;
    }
    if (this.stunTimer <= 0) {
      entity.stunned = false;
      entity.tint = this.originalTint;
    }
  }
}
