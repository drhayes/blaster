'use strict';

export default class Intro extends Phaser.State {
  makeText(y, text, size) {
    size = size || 40;
    let textThing = this.game.add.bitmapText(this.game.world.centerX, y, 'computerPixelFont', text, size);
    textThing.anchor.setTo(0.5, 0.5);
    textThing.align = 'center';
    return textThing;
  }

  create() {
    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0;
    this.backTween = this.game.add.tween(this.back).to({
      alpha: 0.1
    }, 1500, Phaser.Easing.Cubic.Out, true);

    this.logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'blasterLogo');
    this.logo.anchor.setTo(0.5, 0);
    this.logo.scale.set(5);
    this.logo.alpha = 0;
    this.logoTweenSpin = this.game.add.tween(this.logo).to({
      alpha: 1,
      y: 50
    }, 2500, Phaser.Easing.Linear.None, true);
    this.logoTweenSpin.onComplete.add(() => {
      this.game.state.start('mainMenu');
    });
    this.logoTweenShrink = this.game.add.tween(this.logo.scale).to({
      x: 2.3,
      y: 2.3
    }, 2000, Phaser.Easing.Bounce.Out, true);
  }
};
