/*
 * @Date: 2021-03-06 15:44:21
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-13 15:36:41
 */

import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TampermonkeyWebpackPlugin } from '../../src/index';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { header } from './tampermonkey.config';

export default {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  // ignoreWarnings: [/(Critical dependency)/],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://127.0.0.1:8080/',
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CleanWebpackPlugin(), new TampermonkeyWebpackPlugin(header)],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // open: true,
    host: '127.0.0.1',
    port: 8080,
    filename: 'index.js',
    // hot: true,
    // hotOnly: true,
    compress: false,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  } as WebpackDevServerConfiguration,
} as Configuration;
