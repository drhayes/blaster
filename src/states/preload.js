'use strict';

import Shooting from '../plugins/shooting';
import Explosions from '../plugins/explosions';
import Spawn from '../plugins/spawn';
import Tinting from '../plugins/tinting';
import Score from '../plugins/score';

export default class Preload extends Phaser.State {
  preload() {
    this.barBg = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-bg');
    this.barBg.anchor.setTo(0.5, 0.5);
    // This bar will get cropped by the setPreloadSprite function as the game loads!
    this.bar = this.game.add.sprite(game.world.centerX, game.world.centerY, 'loading-fg');
    this.bar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(this.bar);

    this.game.load.bitmapFont('playFont', 'media/fonts/play.png', 'media/fonts/play.fnt');

    this.game.load.image('circuitry', 'media/images/circuitry.jpg', 691, 693);
    this.game.load.spritesheet('player', 'media/images/player.png', 32, 32);

    this.game.load.audio('shoot', 'media/sounds/shoot.mp3');
    this.game.load.audio('smallBoom', 'media/sounds/smallBoom.mp3');
    this.game.load.audio('mediumBoom', 'media/sounds/mediumBoom.mp3');
    this.game.load.audio('playerSpawn', 'media/sounds/playerSpawn.mp3');
    this.game.load.audio('enforcerShoot', 'media/sounds/enforcerShoot.mp3');
    this.game.load.audio('spearShoot', 'media/sounds/spear.mp3');
  }

  create() {
    this.game.plugins.add(Tinting);
    this.game.plugins.add(Shooting);
    this.game.plugins.add(Explosions);
    this.game.plugins.add(Spawn);
    this.game.plugins.add(Score);

    this.game.state.start('main', true, false);
  }
};
