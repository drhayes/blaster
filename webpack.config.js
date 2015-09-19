'use strict';

var webpack = require('webpack');

var definitions = {
  DEBUG: process.env.DEBUG === 'true',
  FULL: process.env.FULL === 'true',
  NATIVE: process.env.NATIVE === 'true',
  PRISONER_EDITOR: process.env.PRISONER_EDITOR === 'true'
};

module.exports = {
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(definitions)
  ],
  resolveLoader: {
    modulesDirectories: ['node_modules', 'tools']
  },
  module: {
    loaders: [{
      test: /index\.html$/,
      loader: 'copy'
    }, {
      test: /\.js$/,
      loader: 'transform/cacheable?brfs!babel'
    }, {
      test: /\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3|\.fnt|\.ogg|\.wav|\.txt|\.frag$/,
      loader: 'file'
    }, {
      test: /\.json$/,
      loader: 'file!mapEntityIdGenerator'
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/,
      loader: 'file!image'
    }, {
      test: /phaser.js|phaser.min.js/,
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
