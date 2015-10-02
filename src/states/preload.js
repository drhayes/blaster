'use strict';

import tracking from '../tracking';

export default class Preload extends Phaser.State {
  preload() {
    this.barBg = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-bg');
    this.barBg.anchor.setTo(0.5, 0.5);
    // This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-fg');
    this.bar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(this.bar);

    this.game.load.bitmapFont('computerPixelFont', 'media/fonts/computerPixel.png', 'media/fonts/computerPixel.fnt');

    this.game.load.image('circuitry', 'media/images/circuitry.jpg', 691, 693);
    this.game.load.spritesheet('player', 'media/images/player.png', 32, 32);
    this.game.load.image('blasterLogo', 'media/images/blasterLogo.png', 523, 97);
    this.game.load.image('button', 'media/images/button.png', 240, 80);

    this.game.load.audio('shoot', 'media/sounds/shoot.mp3');
    this.game.load.audio('smallBoom', 'media/sounds/smallBoom.mp3');
    this.game.load.audio('mediumBoom', 'media/sounds/mediumBoom.mp3');
    this.game.load.audio('playerSpawn', 'media/sounds/playerSpawn.mp3');
    this.game.load.audio('enforcerShoot', 'media/sounds/enforcerShoot.mp3');
    this.game.load.audio('spearShoot', 'media/sounds/spear.mp3');
    this.game.load.audio('march', 'media/sounds/march.mp3');
    this.game.load.audio('spearWarn', 'media/sounds/spearWarn.mp3');
    this.game.load.audio('extraLife', 'media/sounds/extraLife.mp3');
    this.game.load.audio('blip1', 'media/sounds/blip1.mp3');

    tracking.startPreload();
    this.startTime = Date.now();
  }

  create() {
    let totalTime = Date.now() - this.startTime;
    tracking.finishPreload(totalTime);
    this.game.state.start('intro', true, false);
  }
};
