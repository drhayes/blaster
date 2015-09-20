'use strict';

var fs = require('fs');

export default class Boot extends Phaser.State {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.windowConstraints.bottom = 'visual';
    this.scale.parentIsWindow = true;

    this.game.load.image('loading-bg', 'media/images/loadingBarBG.png');
    this.game.load.image('loading-fg', 'media/images/loadingBarFG.png');

    let glow = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/glow.frag', 'utf8'));
    let scanlines = new Phaser.Filter(game, null, fs.readFileSync(__dirname + '/../shaders/scanlines.frag', 'utf8'));
    this.stage.filters = [glow, scanlines];
  }

  create() {
    this.game.state.start('preload');
  }
};
