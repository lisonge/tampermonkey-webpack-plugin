/*
 * @Date: 2021-03-07 12:01:25
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-13 16:25:44
 */
import { UserScriptHeader, Options } from '../../src/index';

export const header: UserScriptHeader = {
  author: 'author',
  name: ['Tampermonkey-hot', ['zh', '油猴脚本-热重载']],
  description: ['description', ['zh', '描述']],
  namespace: 'https://dev.songe.li/',
  icon: 'https://cdn.jsdelivr.net/gh/lisonge/src@main/svg/tampermonkey.svg',
  version: '1.0.1',
  include: [/https:\/\/dev\.songe\.li.*/, 'https://dev.songe.li/*'],
  grant: ['unsafeWindow', 'GM_setValue', 'GM_setValue', 'GM_xmlhttpRequest'],
  externals: [['tag', 'value']],
};

export const options: Options = {
  minAlignSpace: 4,
};
