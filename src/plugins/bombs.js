const NUM_FRAMES = 200;
const SIZE = 400;

export default class Bombs {
  constructor(game) {
    this.game = game;
    game.bombs = this;

    this.currentFrame = 0;
    this.booming = false;
    this.bombFrames = [];
    // Generate shockwave frames.
    let k = 0;
    for (let i = 0; i < NUM_FRAMES; i++) {
      let frame = this.game.make.bitmapData(SIZE, SIZE);
      if (i < NUM_FRAMES / 2) {
        let scale = 1 + (i / 10);
        frame.context.strokeStyle = '#ffff00';
        frame.context.beginPath();
        frame.context.arc(SIZE / 2, SIZE / 2, 16 + i, 0, Math.PI * 2);
        frame.context.stroke();
      }
      for (let j = i - 1; j > i - 5; j--) {
        let innerFrame = this.bombFrames[j];
        frame.copy(innerFrame, 0, 0, SIZE, SIZE, 0, 0, SIZE, SIZE, 0, 0, 0, 1, 1, 0.21, 'overlay');
      }
      this.bombFrames.push(frame);
    }
  }

  boom(x, y) {
    this.booming = true;
    this.x = x;
    this.y = y;
  }

  update() {
  }

  render() {
    if (this.booming) {
      this.game.context.drawImage(this.bombFrames[this.currentFrame].canvas, this.x - SIZE / 2, this.y - SIZE / 2);
      this.currentFrame++;
      if (this.currentFrame === this.bombFrames.length) {
        this.booming = false;
        this.currentFrame = 0;
      }
    }
  }
}
