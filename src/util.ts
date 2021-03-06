/*
 * @Date: 2021-03-06 22:03:13
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-07 01:30:16
 */
import {
  UserScriptHeader,
  IArray,
  LocaleValue,
} from './@types/user-script-header';

export function convertLocaleText(
  key: string,
  value: LocaleValue | undefined,
  kvArray: { k: string; v: IArray<string> }[]
) {
  if (value == undefined) {
    return;
  }
  if (value instanceof Array) {
    for (const el of value) {
      kvArray.push({
        k: [key, el.locale ?? ''].join(':'),
        v: el.value,
      });
    }
  } else {
    kvArray.push({
      k: [key, value.locale ?? ''].join(':'),
      v: value.value,
    });
  }
}
export function convertRegExpText(
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
