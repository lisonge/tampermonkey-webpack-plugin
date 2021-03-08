/*
 * @Date: 2021-03-06 15:48:06
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-09 00:23:05
 */
import { Compiler, Compilation } from 'webpack';
import { ConcatSource } from 'webpack-sources';
import {
  UserScriptHeader,
  Options,
} from './@types/user-script-header';
import { stringify } from './util';

class TampermonkeyWebpackPlugin {
  private h: UserScriptHeader;
  private o?: Options;
  constructor(config: UserScriptHeader, options?: Options) {
    this.h = config;
    this.o = options;
  }
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      'TampermonkeyWebpackPlugin',
      (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: 'TampermonkeyWebpackPlugin',
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          },
          () => {
            for (const chunk of compilation.chunks) {
              for (const file of chunk.files) {
                compilation.updateAsset(
                  file,
                  // @ts-ignore
                  (old) => new ConcatSource(stringify(this.h), '\n\n', old)
                );
              }
            }
          }
        );
      }
    );
  }
}

export { UserScriptHeader, TampermonkeyWebpackPlugin, Options };
