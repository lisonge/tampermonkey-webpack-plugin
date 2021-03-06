/*
 * @Date: 2021-03-07 01:51:03
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-07 01:56:44
 */

import { TampermonkeyWebpackPlugin,UserScriptHeader } from '../src/index';

type IArray<T> = T | T[];

type LocaleValue = IArray<{
  locale?: string;
  value: string;
}>;

function test(op: {
  name: string | LocaleValue;
  namespace: string;
  version: string;
  author: string;
}) {}
function test2(op: UserScriptHeader) {}

// test('');
test({
  name: { value: '' },
  author: 'lisonge',
  namespace: 'namespace',
  version: '1.0.0',
});
test2({
  name: { value: '' },
  author: 'lisonge',
  namespace: 'namespace',
  version: '1.0.0',
});
// new TampermonkeyWebpackPlugin({
//   name: { value: '' },
//   author: 'lisonge',
//   namespace: 'namespace',
//   version: '1.0.0',
// })
