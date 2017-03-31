const path = require('path');
const webpack = require('webpack');

<<<<<<< HEAD
const WDS_PORT = 8000;

=======
>>>>>>> 9987f0e8cb9f2bcdf5b1ef89773590eaa311472d
module.exports = {
  entry: [
    './client',
  ],
  output: {
    filename: 'bundle.js',
<<<<<<< HEAD
    path: path.join(__dirname, './build'),
=======
    path: path.join(__dirname, 'src/build'),
>>>>>>> 9987f0e8cb9f2bcdf5b1ef89773590eaa311472d
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
      // {
      //   test: /(\.css|\.scss)$/,
      //   include: [ path.resolve(__dirname, './client/css') ],
      //   loaders: ['style-loader', 'css-loader'],
      // },
    ]
  },
  devServer: {
    contentBase: './',
    inline: true,
    hot: true,
  },
}