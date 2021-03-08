/*
 * @Date: 2021-03-06 15:44:21
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-08 22:39:44
 */

import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TampermonkeyWebpackPlugin } from '../src/index';
import config from './tampermonkey.config';
export default {
  entry: './entry.ts',
  devtool: 'inline-source-map',
  mode: 'production',
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
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CleanWebpackPlugin(), new TampermonkeyWebpackPlugin(config)],
} as Configuration;
