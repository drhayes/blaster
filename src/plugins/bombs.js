const NUM_FRAMES = 200;
const SIZE = 600;

export default class Bombs {
  constructor(game) {
    this.game = game;
    game.bombs = this;

    this.currentFrame = 0;
    this.lastFrameMS = 0;
    this.booming = false;
    this.bombFrames = [];
    // Generate shockwave frames.
    let radius = 0;
    let radiusDelta = 10;
    for (let i = 0; i < NUM_FRAMES; i++) {
      let frame = this.game.make.bitmapData(SIZE, SIZE);
      if (i < NUM_FRAMES / 2) {
        radius += radiusDelta;
        radiusDelta -= 0.2;
        radiusDelta = Math.max(.1, radiusDelta);
        frame.context.strokeStyle = '#ffff00';
        frame.context.beginPath();
        frame.context.arc(SIZE / 2, SIZE / 2, radius, 0, Math.PI * 2);
        frame.context.stroke();
      }
      for (let j = i - 1; j > i - 5; j--) {
        let innerFrame = this.bombFrames[j];
        frame.copy(innerFrame, 0, 0, SIZE, SIZE, 0, 0, SIZE, SIZE, 0, 0, 0, 1, 1, 0.21, 'overlay');
      }
      this.bombFrames.push(frame);
    }
    this.blastRadius = radius;
    this.angleForMove = new Phaser.Point();
  }

  boom(x, y) {
    this.booming = true;
    this.x = x;
    this.y = y;
    this.lastFrameMS = this.game.time.time;
  }

  bombEnemy(enemy, thing) {
    // If enemy within danger zone, insta-death.
    let enemyDistance = enemy.position.distance(this);
    if (enemyDistance < this.blastRadius) {
      enemy.damage(1);
      if (enemy.stun) {
        enemy.stun();
      }
    }
    if (enemyDistance < this.blastRadius) {
      let knockback = 5000 / enemyDistance;
      // Push enemy back.
      this.angleForMove.set(this.x - enemy.x, this.y - enemy.y)
        .normalize()
        .rotate(0, 0, 180, true)
        .multiply(knockback, knockback);
      enemy.body.velocity.add(this.angleForMove.x, this.angleForMove.y);
    }
  }

  update() {
    // TODO: Cooldown!
    // TODO: Block bullets?
    if (this.booming && this.currentFrame < NUM_FRAMES / 2) {
      this.game.enemiesGroup.forEach(this.bombEnemy, this, true);
    }
  }

  render() {
    if (this.booming) {
      this.game.context.drawImage(this.bombFrames[this.currentFrame].canvas, this.x - SIZE / 2, this.y - SIZE / 2);
      let delta = this.game.time.time - this.lastFrameMS;
      this.lastFrameMS = this.game.time.time;
      this.currentFrame += Math.round(delta / 16);
      if (this.currentFrame >= this.bombFrames.length) {
        this.booming = false;
        this.currentFrame = 0;
      }
    }
  }
}
