/*
 * @Date: 2021-03-06 15:44:21
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-07 02:00:23
 */

import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TampermonkeyWebpackPlugin } from '../src/index';
export default {
  entry: './entry.ts',
  devtool: false,
  mode: 'production',
  target: 'node',
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
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new TampermonkeyWebpackPlugin({
      author: 'lisonge',
      name: [{ value: 'name' }, { value: '名字', locale: 'zh' }],
      namespace: 'namespace',
      version: '1.0.0',
    }),
  ],
} as Configuration;
