import Behavior from './behavior';

export default class Stunnable extends Behavior {
  constructor() {
    super();
  }

  added(entity) {
    entity.stun = () => { entity.stunned = true; }
  }

  update(entity) {
    if (entity.stunned) {
      this.stunTimer -= this.game.time.physicsElapsedMS;
      entity.body.velocity.set(0);
    }
    if (this.stunTimer <= 0) {
      entity.stunned = false;
    }
  }
}
