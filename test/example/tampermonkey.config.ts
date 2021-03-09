/*
 * @Date: 2021-03-07 12:01:25
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-09 15:30:33
 */
import { UserScriptHeader } from '../../index';

const h: UserScriptHeader = {
  author: 'lisonge',
  name: ['Tampermonkey', { value: '油猴脚本', locale: 'zh' }],
  namespace: 'https://dev.songe.li/',
  version: '1.0.0',
  externals: [
    [
      'note',
      '2021.02-10-V24.20',
      '修复谷歌部分失效的问题 && 修复由于BA失效导致的脚本无效的问题',
    ],
  ],
};
export default h;
