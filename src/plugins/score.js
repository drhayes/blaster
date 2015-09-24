'use strict';

import Assassin from '../sprites/assassin';
import Enforcer from '../sprites/enforcer';
import Guard from '../sprites/guard';

let scoreMap = new Map();
scoreMap.set(Assassin, 1000);
scoreMap.set(Enforcer, 500);
scoreMap.set(Guard, 200);

export default class Score extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    game.score = this;
    this.current = 0;
  }

  init() {
    this.text = this.game.add.bitmapText(10, 10, 'playFont', 'Score: 0');
  }

  updateScore() {
    this.text.text = `Score: ${this.current}`;
  }

  killed(thing) {
    this.current += scoreMap[thing];
    this.updateScore();
  }
};
