'use strict';

export default class BlasterButton extends Phaser.Button {
  constructor(game, x, y, text, callback, callbackContext) {
    super(game, x, y, 'button', callback, callbackContext, 0, 0, 0, 0);
    this.buttonText = this.game.add.bitmapText(0, 10, 'computerPixelFont', text, 40);
    this.buttonText.anchor.setTo(0.5, 0.5);
    this.buttonText.align = 'center';
    this.addChild(this.buttonText);
    this.alpha = 0.5;
    this.anchor.setTo(0.5);
    this.blip = this.game.add.audio('blip1');

    this.onInputOver.add(() => {
      this.alpha = 1;
      this.tint = 0x4682b4;
      this.blip.play();
    });
    this.onInputOut.add(() => {
      this.alpha = 0.5;
      this.tint = 0xffffff;
    });
    this.onInputDown.add(() => {
      this.alpha = 1;
    });
    this.onInputUp.add(() => {
      this.alpha = 0.5;
    });
  }
};
