/*
 * @Date: 2021-03-06 15:48:06
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-14 13:45:06
 */
import { Compiler, sources } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { UserScriptHeader, Options } from './@types/user-script-header';
import { buildHotScript, stringify } from './util';

class TampermonkeyWebpackPlugin {
  private o: Options;
  constructor(options: Options) {
    this.o = options;
  }
  apply(compiler: Compiler) {
    const { header } = this.o;
    compiler.hooks.afterCompile.tapPromise(
      'TampermonkeyWebpackPlugin',
      async (compilation) => {
        const { mode } = compiler.options;
        if (mode == 'production') {
          for (const chunk of compilation.chunks) {
            if (!chunk.canBeInitial()) {
              continue;
            }
            for (const file of chunk.files) {
              compilation.updateAsset(file, (old) => {
                return new sources.ConcatSource(
                  stringify(header, this.o?.minAlignSpace),
                  '\n\n',
                  old
                );
              });
            }
          }
        } else if (mode == 'development') {
          let { host, port, filename } = compilation.options
            .devServer as WebpackDevServerConfiguration;
          filename = filename ?? 'index.js';
          host = host ?? '127.0.0.1';
          port = port ?? 8080;
          if (host == '0.0.0.0') {
            host = '127.0.0.1';
          }
          let proxyUserJsFileName =
            this.o?.devServer?.proxyUserJsFileName ?? 'dev-server.user.js';
          compilation.assets[proxyUserJsFileName] = new sources.RawSource(
            [
              stringify(header),
              '\n\n',
              buildHotScript(`http://${host}:${port}/${filename}`),
            ].join('')
          );
          const u = `http://${host}:${port}/${proxyUserJsFileName}`;
          compilation.logger.info('pleace install dev-server proxy script', u);
        }
      }
    );
  }
}

export { UserScriptHeader, TampermonkeyWebpackPlugin, Options };
