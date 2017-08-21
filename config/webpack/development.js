/* eslint-env node */
const merge = require('webpack-merge');
const {join} = require('path');
const {config} = require('@morsedigital/webpack-defaults');
module.exports = merge(config, {
  devtool: 'cheap-eval-source-map'

  , stats: {
    errorDetails: true
  }

  , output: {
    pathinfo: true
  }

  , devServer: {
    // hot: true
    clientLogLevel: 'none'
    , host: 'localhost'
    , port: '8080'
    , contentBase: join(__dirname, '../../', 'public')
    , publicPath: '/packs/'
    , compress: true
    , watchOptions: {
      ignored: /node_modules/
    }
  }
});
