'use strict';

var config = {
  target: 'web',
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'copy'
    }, {
      test: /\.js$/,
      loader: 'babel'
    }, {
      test: /\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3|\.fnt|\.ogg|\.wav|\.txt|\.fnt$/,
      loader: 'file'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.yaml$/,
      loader: 'json!yaml'
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/,
      loader: 'file!image'
    }, {
      test: /phaser.js|phaser.min.js|dat.gui.min.js/,
      loader: 'script'
    }],
  },
  entry: {
    game: './src/game.js'
  },
  output: {
    path: './dist',
    publicPath: '',
    filename: 'game.js'
  }
};

module.exports = config;
