'use strict';

import Shooting from '../plugins/shooting';
import Explosions from '../plugins/explosions';
import Spawn from '../plugins/spawn';
import Tinting from '../plugins/tinting';
import Score from '../plugins/score';
import Waves from '../plugins/waves';
import Player from '../sprites/player';

export default class Main extends Phaser.State {
  create() {
    this.game.plugins.add(Tinting);
    this.game.plugins.add(Waves);
    this.game.plugins.add(Shooting);
    this.game.plugins.add(Explosions);
    this.game.plugins.add(Spawn);
    this.game.plugins.add(Score);

    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.2;
    this.back.tint = this.game.tinting.currentTint;
    // Starting position for player.
    this.back.tilePosition.x = -this.game.world.centerX * 0.2;
    this.back.tilePosition.y = -this.game.world.centerY * 0.2;

  }

  update() {
    let player = this.game.player;
    if (player) {
      this.back.tilePosition.x = -player.x * 0.2;
      this.back.tilePosition.y = -player.y * 0.2;
    }
  }
};
