'use strict';

import Shooting from '../plugins/shooting';
import Explosions from '../plugins/explosions';
import Spawn from '../plugins/spawn';
import Tinting from '../plugins/tinting';
import Score from '../plugins/score';
import Waves from '../plugins/waves';
import Player from '../sprites/player';
import tracking from '../tracking';

export default class Main extends Phaser.State {
  create() {
    this.waves = new Waves(this.game);
    this.tinting = new Tinting(this.game);
    this.shooting = new Shooting(this.game);
    this.explosions = new Explosions(this.game);
    this.spawn = new Spawn(this.game);
    this.score = new Score(this.game);

    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.2;
    this.back.tint = this.game.tinting.currentTint;
    // Starting position for player.
    this.back.tilePosition.x = -this.game.world.centerX * 0.2;
    this.back.tilePosition.y = -this.game.world.centerY * 0.2;
    this.transitionSignal = this.game.waves.onTransition.add(() => {
      this.back.tilePosition.x = -this.game.world.centerX * 0.2;
      this.back.tilePosition.y = -this.game.world.centerY * 0.2;
      this.back.tint = this.game.tinting.currentTint;
    });
    this.game.spawn.onGameOver.addOnce(() => {
      let gameOverText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'computerPixelFont',
      'GAME OVER', 40);
      gameOverText.anchor.setTo(0.5, 0);
      gameOverText.align = 'center';
      this.game.time.events.add(3000, () => {
        gameOverText.text = `GAME OVER
Press any key to continue`;
        this.game.input.keyboard.addCallbacks(this, null, null, this.onKeyPress);
      })
    });

    tracking.startGame();
  }

  onKeyPress() {
    this.transitionSignal.detach();
    this.game.input.keyboard.onPressCallback = null;
    this.game.input.keyboard.reset(true);
    this.game.state.start('mainMenu', true, false);
  }

  update() {
    this.waves.update();
    this.shooting.update();
    this.explosions.update();
    this.spawn.update();

    let player = this.game.player;
    if (player && player.alive) {
      this.back.tilePosition.x = -player.x * 0.2;
      this.back.tilePosition.y = -player.y * 0.2;
    }
  }

  shutdown() {
    this.game.plugins.removeAll();
  }
};
