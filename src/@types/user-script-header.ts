/*
 * @Date: 2021-03-06 17:12:50
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-13 15:41:24
 */

export type IArray<T> = T | T[];

export type LocaleType = [
  string,
  ...(
    | {
        value: string;
        locale: string;
      }[]
    | [string, string][]
  )
];

/**
 * @see <https://www.tampermonkey.net/documentation.php>
 */
export interface UserScriptHeader {
  name: string | LocaleType;
  namespace: string;
  version: string;
  author: string;
  description?: string | LocaleType;
  homepage?: string;
  homepageURL?: string;
  website?: string;
  source?: string;
  icon?: string;
  iconURL?: string;
  defaulticon?: string;
  icon64?: string;
  icon64URL?: string;
  updateURL?: string;
  downloadURL?: string;
  supportURL?: string;
  include?: IArray<string | RegExp>;
  match?: IArray<string | RegExp>;
  exclude?: IArray<string | RegExp>;
  require?: IArray<string>;
  resource?: IArray<{
    name: string;
    url: string;
  }>;
  connect?: IArray<string>;

  'run-at'?:
    | 'document-start'
    | 'document-body'
    | 'document-end'
    | 'document-idle'
    | 'context-menu';
    /**
     * @example <caption>Example //@grant  none</caption>
     * grant:null
     */
  grant?: IArray<
    | 'unsafeWindow'
    | 'window.close'
    | 'window.focus'
    | 'window.onurlchange'
    | 'GM_addStyle'
    | 'GM_addElement'
    | 'GM_deleteValue'
    | 'GM_listValues'
    | 'GM_addValueChangeListener'
    | 'GM_removeValueChangeListener'
    | 'GM_setValue'
    | 'GM_getValue'
    | 'GM_log'
    | 'GM_getResourceText'
    | 'GM_getResourceURL'
    | 'GM_registerMenuCommand'
    | 'GM_unregisterMenuCommand'
    | 'GM_openInTab'
    | 'GM_xmlhttpRequest'
    | 'GM_download'
    | 'GM_getTab'
    | 'GM_saveTab'
    | 'GM_getTabs'
    | 'GM_notification'
    | 'GM_setClipboard'
    | 'GM_info'
  > | null;
  antifeature?: IArray<{
    tag: string;
    type: 'ads' | 'tracking' | 'miner';
    description: string;
  }>;
  noframes?: true;
  /**
   * extra data not belonging to tampermonkey
   */
  externals?: [string, ...string[]][];
}

export type Options = {
  /**
   * @default 4
   */
  minAlignSpace?: number;
  devServer?: {
    /**
     *  Extension Name should be <.user.js>
     * @default `dev-server.user.js`
     */
    proxyUserJsFileName?: string;
  };
};
