import tracking from '../tracking';

const NUM_FRAMES = 200;
const SIZE = 600;
const BLAST_RADIUS = 260;

export default class Bombs {
  constructor(game) {
    this.game = game;
    game.bombs = this;

    this.count = 1;
    this.bombSound = this.game.add.audio('bomb');
    this.bombEmptySound = this.game.add.audio('bombEmpty');
    this.currentFrame = 0;
    this.booming = false;
    // Generate circular queue of shockwave frames.
    this.bombFrames = [];
    for (let i = 0; i < 6; i++) {
      let frame = this.game.make.bitmapData(SIZE, SIZE);
      this.bombFrames.push(frame);
    }
    this.angleForMove = new Phaser.Point();
  }

  boom(x, y) {
    if (this.booming || !this.game.waves.loaded) {
      return;
    }
    tracking.bomb(this.game.waves.current, this.game.lives.lives, this.count);
    if (this.count <= 0) {
      this.bombEmptySound.play();
      return;
    }
    this.count -= 1;
    this.bombSound.play();
    this.booming = true;
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.radiusDelta = 10;
    this.bombFrames.forEach((frame) => { frame.cls(); });
  }

  bombEnemy(enemy, thing) {
    // If enemy within danger zone, insta-death.
    let enemyDistance = enemy.position.distance(this);
    if (enemyDistance < BLAST_RADIUS) {
      enemy.damage(1);
      if (enemy.stun) {
        enemy.stun();
      }
    }
    if (enemyDistance < BLAST_RADIUS) {
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
    if (this.booming && this.game.waves.loaded) {
      this.game.enemiesGroup.forEach(this.bombEnemy, this, true);
      if (this.radius > BLAST_RADIUS) {
        this.booming = false;
      }
    }
    if (!this.game.waves.loaded) {
      this.booming = false;
    }
  }

  render() {
    if (!this.booming) {
      return;
    }
    let frame = this.bombFrames[this.currentFrame];
    frame.cls();
    if (this.radius < BLAST_RADIUS - 20) {
      let colorComponent = Math.floor((BLAST_RADIUS - this.radius)).toString(16);
      frame.context.strokeStyle = `#ffff${colorComponent}`;
      frame.context.lineWidth = 3;
      frame.context.beginPath();
      frame.context.arc(SIZE / 2, SIZE / 2, this.radius, 0, Math.PI * 2);
      frame.context.stroke();
    }

    // TODO: Draw previous frames ghosted.
    for (let i = 1; i < 5; i++) {
      let ghostFrameIndex = this.currentFrame - i;
      if (ghostFrameIndex < 0) {
        ghostFrameIndex = this.bombFrames.length + ghostFrameIndex;
      }
      let ghostFrame = this.bombFrames[ghostFrameIndex];
      frame.copy(ghostFrame, 0, 0, SIZE, SIZE, 0, 0, SIZE, SIZE, 0, 0, 0, 1, 1, 0.45 / i);
    }
    this.currentFrame += 1;
    if (this.currentFrame >= this.bombFrames.length) {
      this.currentFrame = 0;
    }

    this.radius += this.radiusDelta;
    this.radiusDelta -= 0.2;
    this.radiusDelta = Math.max(0.1, this.radiusDelta);

    this.game.context.drawImage(frame.canvas, this.x - SIZE / 2, this.y - SIZE / 2);
  }
}
