'use strict';

export default class MainMenu extends Phaser.State {
  makeText(y, text, size) {
    size = size || 40;
    let textThing = this.game.add.bitmapText(this.game.world.centerX, y, 'computerPixelFont', text, size);
    textThing.anchor.setTo(0.5, 0.5);
    textThing.align = 'center';
    return textThing;
  }
  create() {
    this.titleText = this.makeText(50, 'BLASTER');
    this.instructionsText = this.makeText(200, `WASD to move
IJKL to shoot`);
    this.pressAnyKeyText = this.makeText(this.game.world.centerY, 'Press any key to begin');
    this.knowYourEnemy = this.makeText(670, 'Know your enemy');
    this.enemy = this.makeText(700, 'GUARD    ENFORCER   ASSASSIN   ???');

    this.guard = this.game.add.image(445, 720, 'player', 0);
    this.enforcer = this.game.add.image(591, 739, 'player', 3);
    this.enforcer.anchor.set(0.5, 0.6);
    this.assassin = this.game.add.image(710, 720, 'player', 5);

    this.back = this.game.add.tileSprite(0, 0, 691, 693, 'circuitry');
    this.back.width = 1280;
    this.back.height = 960;
    this.back.fixedToCamera = true;
    this.back.alpha = 0.2;

    this.game.input.keyboard.addCallbacks(this, null, null, this.onKeyPress);

    this.x = -0.1;
    this.y = 0;
  }

  onKeyPress() {
    this.game.input.keyboard.onPressCallback = null;
    this.game.input.keyboard.reset(true);
    this.game.state.start('main', true, false);
  }

  update() {
    this.back.tilePosition.x += this.x * this.game.time.physicsElapsedMS;
    this.back.tilePosition.y += this.y * this.game.time.physicsElapsedMS;
    if (Math.random() < 0.02) {
      if (Math.random() < 0.5) {
        this.x = 0;
        this.y = Math.random() < 0.5 ? 0.1 : -0.1;
      } else {
        this.y = 0;
        this.x = Math.random() < 0.5 ? 0.1 : -0.1;
      }
    }
    this.titleText.tint = Math.random() * 0xffffff;
    this.enforcer.angle += 0.1 * this.game.time.physicsElapsedMS;
  }
};
