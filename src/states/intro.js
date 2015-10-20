'use strict';

import BaseIntro from './baseIntro';

export default class Intro extends BaseIntro {
  makeText(y, text, size) {
    size = size || 40;
    let textThing = this.game.add.bitmapText(this.game.world.centerX, y, 'computerPixelFont', text, size);
    textThing.anchor.setTo(0.5, 0.5);
    textThing.align = 'center';
    return textThing;
  }

  create() {
    super.create();
    this.game.input.keyboard.addCallbacks(this, null, null, this.nextState);
    this.game.input.onDown.addOnce(this.nextState, this);

    this.back.alpha = 0;
    this.game.add.tween(this.back).to({
      alpha: 0.1
    }, 1000, Phaser.Easing.Cubic.Out, true);

    let phaserLogo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'phaserLogo');
    phaserLogo.alpha = 0;
    phaserLogo.anchor.set(0.5);
    let drhayesLogo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'drhayesLogo');
    drhayesLogo.alpha = 0;
    drhayesLogo.anchor.set(0.5);
    let drhayesText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height * 3/4, 'computerPixelFont', 'A game by David Hayes', 40);
    drhayesText.alpha = 0;
    drhayesText.anchor.setTo(0.5);

    this.game.add.tween(phaserLogo).to({
      alpha: 1
    }, 1500, Phaser.Easing.Cubic.Out, true, 0, 0, true);

    this.game.add.tween(drhayesLogo).to({
      alpha: 1
    }, 1500, Phaser.Easing.Cubic.Out, true, 3000, 0, true);
    this.game.add.tween(drhayesText).to({
      alpha: 1
    }, 1500, Phaser.Easing.Cubic.Out, true, 3000, 0, true);

    this.logo.y = this.game.world.height;
    let logoTween = this.game.add.tween(this.logo).to({
      alpha: 1,
      y: 50
    }, 2500, Phaser.Easing.Cubic.Out, true, 6000);
    logoTween.onComplete.add(() => {
      this.nextState();
    });
    this.alphaText.alpha = 0;
  }

  nextState() {
    this.game.input.keyboard.onPressCallback = null;
    this.game.input.keyboard.reset(true);
    this.game.state.start('mainMenu');
  }
}
