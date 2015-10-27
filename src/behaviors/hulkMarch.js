import Behavior from './behavior';

const VELOCITY = 30;

export default class HulkMarch extends Behavior {
  constructor() {
    super();
    this.vector = new Phaser.Point(0, 0);
  }

  update(entity) {
    let player = entity.game.player;
    if (player && player.alive && Math.random() < 0.02) {
      this.vector.setTo(player.x - entity.x, player.y - entity.y);
      if (Math.random() < 0.5) {
        this.vector.x = 0;
      } else {
        this.vector.y = 0;
      }
      if (Math.random() < 0.3) {
        this.vector.rotate(0, 0, 180, true);
      }
      this.vector.normalize();
    }
    entity.body.velocity.x = this.vector.x * VELOCITY;
    entity.body.velocity.y = this.vector.y * VELOCITY;
  }
}
