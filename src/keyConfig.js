'use strict';

var ls = require('local-storage');

export const KEYS = ['moveUp', 'moveDown', 'moveLeft', 'moveRight',
  'shootUp', 'shootDown', 'shootLeft', 'shootRight'];

let keyConfig = {
  moveUp: Phaser.Keyboard.W,
  moveDown: Phaser.Keyboard.S,
  moveLeft: Phaser.Keyboard.A,
  moveRight: Phaser.Keyboard.D,

  shootUp: Phaser.Keyboard.I,
  shootDown: Phaser.Keyboard.K,
  shootLeft: Phaser.Keyboard.J,
  shootRight: Phaser.Keyboard.L
};

// Dupe as defaults for easy restting.
keyConfig.defaults = Object.assign({}, keyConfig);

export function save () {
  ls('blasterKeys', keyConfig);
};

export function load () {
  let keys = ls('blasterKeys');
  if (!keys) {
    return;
  }
  KEYS.forEach((key) => {
    keyConfig[key] = keys[key];
  });
};

export function reset () {
  KEYS.forEach((key) => {
    keyConfig[key] = keyConfig.defaults[key];
  });
};

export default keyConfig;
