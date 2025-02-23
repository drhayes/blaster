import Boot from './states/boot';
import Preload from './states/preload';
import Intro from './states/intro';
import MainMenu from './states/mainMenu';
import Instructions from './states/instructions';
import Options from './states/options';
import Main from './states/main';

var game = window.game = new Phaser.Game({
  width: 1280,
  height: 960,
  renderer: Phaser.CANVAS,
  state: new Boot(),
  transparent: false,
  antialias: false,
  canvasStyle: ''
});
game.state.add('preload', new Preload());
game.state.add('intro', new Intro());
game.state.add('mainMenu', new MainMenu());
game.state.add('instructions', new Instructions());
game.state.add('options', new Options());
game.state.add('main', new Main());
