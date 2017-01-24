//require('dotenv').load({ silent: true })

const chalk = require('chalk')
const config = require('config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const styleLoader = new ExtractTextPlugin('[name].css')
const webpack = require('webpack')

// Environment variables
const COBOT_TOKEN = config.get('cobotToken')
const COBOT_SUBDOMAIN = config.get('cobotSubdomain')
const COBOT_CLIENT_ID = config.get('cobotClientId')
const HOST = config.get('host')
const NODE_ENV = config.get('env')
const NUMBER_OF_MONTHS = config.get('numMonths')
const REFRESH_INTERVAL = config.get('refreshInterval')

console.log(
  '🔨 ',
  chalk.green('Building with environment'),
  chalk.blue.underline(NODE_ENV)
)

const webpackConfig = {
  entry:  {
    frontend: [
      'babel-polyfill',
      './frontend/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    //publicPath: ASSET_HOST,
  },
  plugins: [
    styleLoader,
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Chimera Calendar',
      template: 'frontend/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        COBOT_CLIENT_ID,
        COBOT_SUBDOMAIN,
        COBOT_TOKEN,
        HOST,
        NODE_ENV,
        NUMBER_OF_MONTHS,
        REFRESH_INTERVAL,
      }),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(server|node_modules)/,
        loader: 'babel',
        cacheDirectory: true,
        query: {
          presets: [ 'react', 'es2015', 'stage-1' ],
        },
      },
      {
        test: /\.(css|scss|sass)/,
        loader: styleLoader.extract(
          'style-loader',
          'css-loader!autoprefixer-loader!sass-loader'
        ),
      },
      {
        test: /\.(svg|woff|woff2|eot|dtd|png|gif|jpg|jpeg|ttf)(\?.*)?$/,
        loader: 'file',
      },
    ],
  },
}

if (NODE_ENV === 'test' || NODE_ENV === 'development') {
  webpackConfig.debug = true
  webpackConfig.devtool = 'eval'
}

if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
  webpackConfig.sassLoader = {
    outputStyle: 'compressed',
  }
}

module.exports = webpackConfig
