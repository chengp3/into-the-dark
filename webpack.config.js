const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  mode: 'production',
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};