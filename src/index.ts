/*
 * @Date: 2021-03-06 15:48:06
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-07 01:58:41
 */
import { Compiler, Compilation } from 'webpack';
import { ConcatSource } from 'webpack-sources';
import {
  UserScriptHeader,
  IArray,
  LocaleValue,
} from './@types/user-script-header';
import { convertLocaleText, convertRegExpText } from './util';
const headerStart = '==UserScript==';
const headerStop = '==/UserScript==';

function stringify(ush: UserScriptHeader): string {
  const {
    name,
    description,
    include,
    match,
    exclude,
    require,
    connect,
    grant,
    resource,
    antifeature,
  } = ush;
  const kvArray: { k: string; v: IArray<string> }[] = [];
  if (typeof name != 'string') {
    convertLocaleText('name', name, kvArray);
  }
  if (typeof description != 'string') {
    convertLocaleText('description', description, kvArray);
  }
  if (include instanceof Array) {
    convertRegExpText('include', include, kvArray);
  }
  if (match instanceof Array) {
    convertRegExpText('match', match, kvArray);
  }
  if (exclude instanceof Array) {
    convertRegExpText('exclude', exclude, kvArray);
  }
  if (require instanceof Array) {
    convertRegExpText('require', require, kvArray);
  }
  if (connect instanceof Array) {
    convertRegExpText('connect', connect, kvArray);
  }
  if (grant === null) {
    kvArray.push({ k: 'grant', v: 'none' });
  } else if (grant instanceof Array) {
    convertRegExpText('grant', grant, kvArray);
  }
  if (resource != undefined) {
    if (resource instanceof Array) {
      for (const el of resource) {
        kvArray.push({ k: 'resource', v: [el.name, el.url] });
      }
    } else {
      kvArray.push({ k: 'resource', v: [resource.name, resource.url] });
    }
  }
  if (antifeature != undefined) {
    if (antifeature instanceof Array) {
      for (const el of antifeature) {
        kvArray.push({ k: 'resource', v: [el.tag, el.type, el.description] });
      }
    } else {
      kvArray.push({
        k: 'resource',
        v: [antifeature.tag, antifeature.type, antifeature.description],
      });
    }
  }
  for (const k in ush) {
    // @ts-ignore
    const v = ush[k];
    if (typeof v == 'string') {
      kvArray.push({ k, v });
    }
  }
  // TODO 属性排序
  let textLineArray: string[] = [headerStart];
  for (const { k, v } of kvArray) {
    if (v instanceof Array) {
      textLineArray.push(['@' + k, ...v].join('\x20'));
    } else {
      textLineArray.push(['@' + k, v].join('\x20'));
    }
  }
  textLineArray.push(headerStop);
  textLineArray = textLineArray.map((v) => `//\x20` + v);
  return textLineArray.join('\n');
}
class TampermonkeyWebpackPlugin {
  private h: UserScriptHeader;
  constructor(options: UserScriptHeader) {
    this.h = options;
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
                  (old) => new ConcatSource(stringify(this.h), '\n', old)
                );
              }
            }
          }
        );
      }
    );
  }
}

export { UserScriptHeader, TampermonkeyWebpackPlugin };
