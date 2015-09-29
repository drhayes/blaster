'use strict';

var Boot = require('./states/boot');
var Preload = require('./states/preload');
var MainMenu = require('./states/mainMenu');
var Main = require('./states/main');
import tracking from './tracking';

var game = window.game = new Phaser.Game({
  width: 1280,
  height: 960,
  renderer: Phaser.AUTO,
  state: new Boot(),
  transparent: false,
  antialias: false,
  canvasStyle: ''
});
game.state.add('preload', new Preload());
game.state.add('mainMenu', new MainMenu());
game.state.add('main', new Main());
