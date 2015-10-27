var ls = require('local-storage');

export const KEYS = ['moveUp', 'moveDown', 'moveLeft', 'moveRight',
  'shootUp', 'shootDown', 'shootLeft', 'shootRight', 'bomb'];

let keyConfig = {
  moveUp: Phaser.Keyboard.W,
  moveDown: Phaser.Keyboard.S,
  moveLeft: Phaser.Keyboard.A,
  moveRight: Phaser.Keyboard.D,

  shootUp: Phaser.Keyboard.I,
  shootDown: Phaser.Keyboard.K,
  shootLeft: Phaser.Keyboard.J,
  shootRight: Phaser.Keyboard.L,

  bomb: Phaser.Keyboard.SPACEBAR
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
    let loadedKey = keys[key];
    // If a key is added after players stored their preference then this would erase the keyConfig
    // for that key without this check. Discovered when I added the bomb key.
    if (loadedKey) {
      keyConfig[key] = loadedKey;
    }
  });
};

export function reset () {
  KEYS.forEach((key) => {
    keyConfig[key] = keyConfig.defaults[key];
  });
};

export default keyConfig;
