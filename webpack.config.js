const path = require('path');
const webpack = require('webpack');

const WDS_PORT = 8000;

module.exports = {
  entry: [
    './client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './build'),
    publicPath: '/build/'
  },
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [ path.resolve(__dirname, './client') ],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.css|\.scss)$/,
        include: [ path.resolve(__dirname, './client/css') ],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  devServer: {
    contentBase: './client',
    inline: true,
    hot: true,
  },
}