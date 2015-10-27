import { load as loadKeys } from '../keyConfig';

export default class Boot extends Phaser.State {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.windowConstraints.bottom = 'visual';
    this.scale.parentIsWindow = true;

    this.game.load.image('loading-bg', require('../../media/images/loadingBarBG.png'));
    this.game.load.image('loading-fg', require('../../media/images/loadingBarFG.png'));

    this.game.input.gamepad.start();
    loadKeys();
  }

  create() {
    this.game.state.start('preload');
  }
}
