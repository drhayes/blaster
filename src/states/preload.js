'use strict';

import tracking from '../tracking';

export default class Preload extends Phaser.State {
  preload() {
    this.barBg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading-bg');
    this.barBg.anchor.setTo(0.5, 0.5);
    // This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading-fg');
    this.bar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(this.bar);

    this.game.load.bitmapFont('computerPixelFont', require('../../media/fonts/computerPixel.png'), require('../../media/fonts/computerPixel.fnt'));

    this.game.load.image('circuitry', require('../../media/images/circuitry.jpg'), 691, 693);
    this.game.load.spritesheet('player', require('../../media/images/player.png'), 32, 32);
    this.game.load.image('blasterLogo', require('../../media/images/blasterLogo.png'), 523, 97);
    this.game.load.image('button', require('../../media/images/button.png'), 240, 80);
    this.game.load.image('phaserLogo', require('../../media/images/Phaser-Logo-Small.png'), 382, 331);
    this.game.load.image('drhayesLogo', require('../../media/images/drhayes.png'), 552, 586);

    this.game.load.audio('shoot', require('../../media/sounds/shoot.mp3'));
    this.game.load.audio('smallBoom', require('../../media/sounds/smallBoom.mp3'));
    this.game.load.audio('mediumBoom', require('../../media/sounds/mediumBoom.mp3'));
    this.game.load.audio('playerSpawn', require('../../media/sounds/playerSpawn.mp3'));
    this.game.load.audio('enforcerShoot', require('../../media/sounds/enforcerShoot.mp3'));
    this.game.load.audio('spearShoot', require('../../media/sounds/spear.mp3'));
    this.game.load.audio('march', require('../../media/sounds/march.mp3'));
    this.game.load.audio('spearWarn', require('../../media/sounds/spearWarn.mp3'));
    this.game.load.audio('extraLife', require('../../media/sounds/extraLife.mp3'));
    this.game.load.audio('blip1', require('../../media/sounds/blip1.mp3'));
    this.game.load.audio('blip2', require('../../media/sounds/blip2.mp3'));
    this.game.load.audio('bomb', require('../../media/sounds/bomb.mp3'));
    this.game.load.audio('bombEmpty', require('../../media/sounds/bombEmpty.mp3'));

    tracking.startPreload();
    this.startTime = Date.now();
  }

  create() {
    let totalTime = Date.now() - this.startTime;
    tracking.finishPreload(totalTime);
    this.game.state.start('intro', true, false);
  }
}
