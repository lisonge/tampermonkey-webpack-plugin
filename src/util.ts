/*
 * @Date: 2021-03-06 22:03:13
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-13 16:24:34
 */
import {
  UserScriptHeader,
  IArray,
  LocaleType,
} from './@types/user-script-header';

function convertLocaleText(
  key: string,
  value: LocaleType,
  kvArray: { k: string; v: IArray<string> }[]
) {
  kvArray.push({
    k: key,
    v: value[0],
  });
  for (const el of value) {
    if (el instanceof Array) {
      kvArray.push({
        k: `${key}:${el[0]}`,
        v: el[1],
      });
    } else if (el instanceof Object) {
      kvArray.push({
        k: `${key}:${el.locale}`,
        v: el.value,
      });
    }
  }
}

function convertRegExpText(
  key: string,
  value: Array<string | RegExp> | undefined,
  kvArray: { k: string; v: IArray<string> }[]
) {
  if (value == undefined) {
    return;
  }
  for (const v of value) {
    kvArray.push({
      k: key,
      v: String(v),
    });
  }
}

const headerStart = '==UserScript==';
const headerStop = '==/UserScript==';
/**
 *
 * @param ush
 * @param minAlignSpace default 4
 * @returns
 */
export function stringify(
  ush: UserScriptHeader,
  minAlignSpace: number = 4
): string {
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
  if (name instanceof Array) {
    convertLocaleText('name', name, kvArray);
  }
  if (description instanceof Array) {
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
    if (typeof v == 'string' || v instanceof RegExp) {
      kvArray.push({ k, v: String(v) });
    }
  }
  for (const k of ush.externals ?? []) {
    kvArray.push({ k: k[0], v: k.slice(1) });
  }
  let textLineArray: string[][] = [];
  for (const { k, v } of kvArray) {
    let lineArray: string[];
    if (v instanceof Array) {
      lineArray = ['@' + k, ...v];
    } else {
      lineArray = ['@' + k, v];
    }
    textLineArray.push(lineArray);
  }
  const maxLen = Math.max(...textLineArray.map((el) => el[0].length));
  textLineArray.forEach((el) => {
    el[0] += multipleChar('\x20', maxLen - el[0].length);
  });
  return [
    headerStart,
    ...textLineArray.map((el) => el.join(multipleChar('\x20', minAlignSpace))),
    headerStop,
  ]
    .map((v) => `//\x20` + v)
    .join('\n');
}

export const multipleChar = (char: string, count: number) =>
  Array(count).fill(char).join('');

export function buildHotScript(entryUrl: string) {
  return `/* eslint-disable */ /* spell-checker: disable */
(async function () {
  'use strict';
  const uniqueKey = Math.random().toString(16);
  const entryUrl = '${entryUrl}';
  Object.defineProperty(self, 'webpackHotUpdate', {
    set(v) {
      self[uniqueKey] = v;
      Object.assign(document, {
        webpackHotUpdate: v,
      });
      const script = document.createElement('script');
      script.id = Math.random().toString(16);
      script.innerHTML = \`(async function () {
        if(self[\${uniqueKey}] == undefined){
          self.webpackHotUpdate = document.webpackHotUpdate;
        }
        const script = document.getElementById('\${script.id}');
        script.parentElement.removeChild(script);
      })();\`;
      document.appendChild(script);
    },
    get() {
      return self[uniqueKey];
    },
  });
  const resp = await fetch(entryUrl);
  if (resp.ok) {
    eval(await resp.text());
  }
})();`;
}
