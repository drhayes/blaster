'use strict';

export default class Preload extends Phaser.State {
  preload() {
    this.barBg = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-bg');
    this.barBg.anchor.setTo(0.5, 0.5);
    // This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-fg');
    this.bar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(this.bar);

    this.game.load.spritesheet('player', 'media/images/player.png', 32, 32);

    this.game.load.audio('shoot', 'media/sounds/shoot.mp3');
  }

  create() {
    this.game.state.start('main', true, false);
  }
};
