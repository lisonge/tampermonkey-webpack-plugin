/*
 * @Date: 2021-03-09 16:09:45
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-09 16:13:24
 */

// declare module 'tampermonkey' {

// }

// https://tampermonkey.net/documentation.php

/**
 * The unsafeWindow Object provides full access to the pages javascript functions and variables.
 */
declare const unsafeWindow: Window;

/**
 * Get some info about the script and TM.
 */
declare const GM_info: {
  downloadMode: string;
  isIncognito: boolean;
  script: GMInfoScript;
  scriptHandler: string;
  scriptMetaStr: string;
  scriptSource: string;
  scriptUpdateURL?: string;
  scriptWillUpdate: boolean;
  version: string;
};
interface GMInfoScript {
  author: string;
  blockers: string[];
  description: string;
  description_i18n: GMInfoI18n;
  downloadURL: string | null;
  evilness: number;
  excludes: string[];
  grant: string[];
  header: string;
  homepage: string | null;
  icon: string | null;
  icon64: string | null;
  includes: string[];
  lastModified: number;
  matches: string[];
  name: string;
  name_i18n: GMInfoI18n;
  namespace: string;
  options: GMInfoOptions;
  position: number;
  resources: GMInfoResources[];
  'run-at': string;
  supportURL?: string;
  sync: GMInfoSync;
  unwrap: boolean;
  updateURL: string | null;
  uuid: string;
  version: string;
  webRequest: string | null;
}
interface GMInfoI18n {
  [index: string]: string;
}
interface GMInfoOptions {
  awareOfChrome: boolean;
  check_for_updates: boolean;
  comment: string | null;
  compat_arrayleft: boolean;
  compat_foreach: boolean;
  compat_forvarin: boolean;
  compat_metadata: boolean;
  compat_prototypes: boolean;
  compat_uW_gmonkey: boolean;
  compat_wrappedjsObject: boolean;
  compatopts_for_requires: boolean;
  noframes: boolean | null;
  override: GMInfoOverride;
  run_at: string;
}
interface GMInfoOverride {
  merge_connects: boolean;
  merge_excludes: boolean;
  merge_includes: boolean;
  merge_matches: boolean;
  orig_connects: string[];
  orig_excludes: string[];
  orig_includes: string[];
  orig_matches: string[];
  orig_noframes: boolean | null;
  orig_run_at: string;
  use_blockers: string[];
  use_connects: string[];
  use_excludes: string[];
  use_includes: string[];
  use_matches: string[];
}
interface GMInfoResources {
  content: string;
  meta: string;
  name: string;
  url: string;
}
interface GMInfoSync {
  imported: boolean;
}

/**
 * GM_openInTab
 *
 * @interface GMOpenInTabOptions
 */
interface GMOpenInTabOptions {
  /**
   * decides whether the new tab should be focused
   *
   * @type {boolean}
   * @memberof GMOpenInTabOptions
   */
  active?: boolean;
  /**
   * inserts the new tab after the current one
   *
   * @type {boolean}
   * @memberof GMOpenInTabOptions
   */
  insert?: boolean;
  /**
   * makes the browser re-focus the current tab on close.
   *
   * @type {boolean}
   * @memberof GMOpenInTabOptions
   */
  setParent?: boolean;
}
interface GMOpenInTabRetuens {
  close: () => void;
  closed: boolean;
  onclose: () => void;
}

/**
 * GM_xmlhttpRequest
 *
 * @interface GMXMLHttpRequestOptions
 */
interface GMXMLHttpRequestOptions {
  /**
   * one of GET, HEAD, POST
   *
   * @type {('GET' | 'HEAD' | 'POST')}
   * @memberof GMXMLHttpRequestOptions
   */
  method: 'GET' | 'HEAD' | 'POST';
  /**
   * the destination URL
   *
   * @type {string}
   * @memberof GMXMLHttpRequestOptions
   */
  url: string;
  /**
   * ie. user-agent, referer, ... (some special headers are not supported by Safari and Android browsers)
   *
   * @type {{ [index: string]: string | number }}
   * @memberof GMXMLHttpRequestOptions
   */
  headers?: { [index: string]: string | number };
  /**
   * some string to send via a POST request
   *
   * @type {string}
   * @memberof GMXMLHttpRequestOptions
   */
  data?: string;
  /**
   * send the data string in binary mode
   *
   * @type {boolean}
   * @memberof GMXMLHttpRequestOptions
   */
  binary?: boolean;
  /**
   * a timeout in ms
   *
   * @type {number}
   * @memberof GMXMLHttpRequestOptions
   */
  timeout?: number;
  /**
   * a property which will be added to the response Object
   *
   * @type {*}
   * @memberof GMXMLHttpRequestOptions
   */
  context?: any;
  /**
   * one of arraybuffer, blob, json
   *
   * @type {XMLHttpRequestResponseType}
   * @memberof GMXMLHttpRequestOptions
   */
  responseType?: XMLHttpRequestResponseType;
  /**
   * a MIME type for the request
   *
   * @type {string}
   * @memberof GMXMLHttpRequestOptions
   */
  overrideMimeType?: string;
  /**
   * don't send cookies with the requests (please see the fetch notes)
   *
   * @type {boolean}
   * @memberof GMXMLHttpRequestOptions
   */
  anonymous?: boolean;
  /**
   * (beta) use a fetch instead of a xhr request
   * (at Chrome this causes xhr.abort, details.timeout and xhr.onprogress to not work and makes xhr.onreadystatechange receive only readyState 4 events)
   *
   * @type {boolean}
   * @memberof GMXMLHttpRequestOptions
   */
  fetch?: boolean;
  /**
   * a username for authentication
   *
   * @type {string}
   * @memberof GMXMLHttpRequestOptions
   */
  username?: string;
  /**
   * a password
   *
   * @type {string}
   * @memberof GMXMLHttpRequestOptions
   */
  password?: string;
  /**
   * callback to be executed if the request was aborted
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onabort?: (response: GMXMLHttpRequestResponse) => void;
  /**
   * callback to be executed if the request ended up with an error
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onerror?: (response: GMXMLHttpRequestResponse) => void;
  /**
   * callback to be executed if the request was loaded
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onload?: (response: GMXMLHttpRequestResponse) => void;
  /**
   * callback to be executed if the request started to load
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onloadstart?: (response: GMXMLHttpRequestResponse) => void;
  /**
   * callback to be executed if the request made some progress
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onprogress?: (response: GMXMLHttpRequestProgressResponse) => void;
  /**
   * callback to be executed if the request's ready state changed
   *
   * @memberof GMXMLHttpRequestOptions
   */
  onreadystatechange?: (response: GMXMLHttpRequestResponse) => void;
  /**
   * callback to be executed if the request failed due to a timeout
   *
   * @memberof GMXMLHttpRequestOptions
   */
  ontimeout?: ({}) => void;
}
interface GMXMLHttpRequestResponse {
  readonly context: any;
  readonly finalUrl: string;
  readonly readyState: number;
  readonly response: ArrayBuffer | Blob | string | any;
  readonly responseHeaders: string;
  readonly responseText: string;
  readonly responseXML: Document;
  readonly status: number;
  readonly statusText: string;
}
interface GMXMLHttpRequestProgressResponse extends GMXMLHttpRequestResponse {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly total: number;
}
interface GMXMLHttpRequestReturns {
  /**
   * function to be called to cancel this request
   *
   * @memberof GMXMLHttpRequestReturns
   */
  abort(): void;
}

/**
 * GM_download
 *
 * @interface GMDownloadOptions
 */
interface GMDownloadOptions {
  /**
   * the URL from where the data should be downloaded
   *
   * @type {string}
   * @memberof GMDownloadOptions
   */
  url: string;
  /**
   * the filename - for security reasons the file extension needs to be whitelisted at the Tampermonkey options page
   *
   * @type {string}
   * @memberof GMDownloadOptions
   */
  name: string;
  /**
   * see GM_xmlhttpRequest for more details
   *
   * @type {*}
   * @memberof GMDownloadOptions
   */
  headers?: any;
  /**
   * boolean value, show a saveAs dialog
   *
   * @type {boolean}
   * @memberof GMDownloadOptions
   */
  saveAs?: boolean;
  /**
   * callback to be executed if the download ended up with an error
   *
   * @memberof GMDownloadOptions
   */
  onerror?: (error: GMDownloadError) => void;
  /**
   * callback to be executed if the download finished
   *
   * @memberof GMDownloadOptions
   */
  onload?: ({}) => void;
  /**
   * callback to be executed if the download made some progress
   *
   * @memberof GMDownloadOptions
   */
  onprogress?: (response: GMXMLHttpRequestProgressResponse) => void;
  /**
   * callback to be executed if the download failed due to a timeout
   *
   * @memberof GMDownloadOptions
   */
  ontimeout?: ({}) => void;
}
/**
 * not_enabled - the download feature isn't enabled by the user
 * not_whitelisted - the requested file extension is not whitelisted
 * not_permitted - the user enabled the download feature, but did not give the downloads permission
 * not_supported - the download feature isn't supported by the browser/version
 * not_succeeded - the download wasn't started or failed, the details attribute may provide more information
 *
 * @interface GMDownloadError
 */
interface GMDownloadError {
  error:
    | 'not_enabled'
    | 'not_whitelisted '
    | 'not_permitted'
    | 'not_supported'
    | 'not_succeeded';
  details?: any;
}
interface GMDownloadReturns {
  /**
   * function to be called to cancel this download
   *
   * @memberof GMDownloadReturns
   */
  abort(): void;
}

/**
 * GM_notification
 *
 * @interface GMNotificationOptions
 */
interface GMNotificationOptions {
  /**
   * the text of the notification (optional if highlight is set)
   *
   * @type {string}
   * @memberof GMNotificationOptions
   */
  text?: string;
  /**
   * the notificaton title
   *
   * @type {string}
   * @memberof GMNotificationOptions
   */
  title?: string;
  /**
   * the image
   *
   * @type {string}
   * @memberof GMNotificationOptions
   */
  image?: string;
  /**
   * a boolean flag whether to highlight the tab that sends the notfication
   *
   * @type {boolean}
   * @memberof GMNotificationOptions
   */
  highlight?: boolean;
  /**
   * the time after that the notification will be hidden(ms, 0 = disabled)
   *
   * @type {number}
   * @memberof GMNotificationOptions
   */
  timeout?: number;
  /**
   * called when the notification is closed(no matter if this was triggered by a timeout or a click) or the tab was highlighted
   *
   * @memberof GMNotificationOptions
   */
  ondone?: (click: boolean) => void;
  /**
   * called in case the user clicks the notification
   *
   * @memberof GMNotificationOptions
   */
  onclick?: (click: boolean) => void;
}

/**
 * GM_setClipboard
 *
 * @interface GMSetClipboardInfo
 */
interface GMSetClipboardInfo {
  type: string;
  mimetype: string;
}

/**
 * Adds the given style to the document and returns the injected style element.
 *
 * @param {string} css
 * @returns {HTMLStyleElement}
 */
declare function GM_addStyle(css: string): HTMLStyleElement;

/**
 * Deletes 'name' from storage.
 *
 * @param {string} name
 */
declare function GM_deleteValue(name: string): void;

/**
 * List all names of the storage.
 *
 * @returns {string[]}
 */
declare function GM_listValues(): string[];

/**
 * Adds a change listener to the storage and returns the listener ID.
 * 'name' is the name of the observed variable.
 * The 'remote' argument of the callback function shows whether this value was modified from the instance of another tab (true) or within this script instance (false).
 * Therefore this functionality can be used by scripts of different browser tabs to communicate with each other.
 *
 * @param {string} name
 * @param {(name: string, old_value: any, new_value: any, remote: boolean) => void} callback
 * @returns {number}
 */
declare function GM_addValueChangeListener(
  name: string,
  callback: (
    name: string,
    old_value: any,
    new_value: any,
    remote: boolean
  ) => void
): number;

/**
 * Removes a change listener by its ID.
 *
 * @param {number} listener_id
 */
declare function GM_removeValueChangeListener(listener_id: number): void;

/**
 * Set the value of 'name' to the storage.
 *
 * @param {string} name
 * @param {*} value
 */
declare function GM_setValue(name: string, value: any): void;

/**
 * Get the value of 'name' from storage.
 *
 * @param {string} name
 * @param {*} [defaultValue]
 * @returns {*}
 */
declare function GM_getValue(name: string, defaultValue?: any): any;

/**
 * Log a message to the console.
 *
 * @param {*} message
 */
declare function GM_log(message: any): void;

/**
 * Get the content of a predefined @resource tag at the script header.
 *
 * @param {string} name
 * @returns {string}
 */
declare function GM_getResourceText(name: string): string;

/**
 * Get the base64 encoded URI of a predefined @resource tag at the script header.
 *
 * @param {string} name
 * @returns {string}
 */
declare function GM_getResourceURL(name: string): string;

/**
 * Register a menu to be displayed at the Tampermonkey menu at pages where this script runs and returns a menu command ID.
 *
 * @param {string} name
 * @param {() => void} fn
 * @param {string} [accessKey]
 * @returns {number}
 */
declare function GM_registerMenuCommand(
  name: string,
  fn: () => void,
  accessKey?: string
): number;

/**
 * Unregister a menu command that was previously registered by GM_registerMenuCommand with the given menu command ID.
 *
 * @param {number} menuCmdId
 */
declare function GM_unregisterMenuCommand(menuCmdId: number): void;

/**
 * Open a new tab with this url.
 *
 * @param {string} url
 * @param {GMOpenInTabOptions} [options]
 * @returns {GMOpenInTabRetuens}
 */
declare function GM_openInTab(
  url: string,
  options?: GMOpenInTabOptions
): GMOpenInTabRetuens;
declare function GM_openInTab(
  url: string,
  loadInBackground?: boolean
): GMOpenInTabRetuens;

/**
 * Make an xmlHttpRequest.
 *
 * @param {GMXMLHttpRequestOptions} details
 * @returns {GMXMLHttpRequestReturns}
 */
declare function GM_xmlhttpRequest(
  details: GMXMLHttpRequestOptions
): GMXMLHttpRequestReturns;

/**
 * Downloads a given URL to the local disk.
 *
 * @param {GMDownloadOptions} details
 * @returns {GMDownloadReturns}
 */
declare function GM_download(details: GMDownloadOptions): GMDownloadReturns;
declare function GM_download(url: string, name: string): GMDownloadReturns;

/**
 * Get a Object that is persistent as long as this tab is open.
 *
 * @param {(tab: any) => void} cb
 */
declare function GM_getTab(cb: (tab: any) => void): void;

/**
 * Save the tab Object to reopen it after a page unload.
 *
 * @param {*} tab
 */
declare function GM_saveTab(tab: any): void;

/**
 * Get all tab Objects as a hash to communicate with other script instances.
 *
 * @param {(tabs: { [index: number]: any }) => void} cb
 */
declare function GM_getTabs(cb: (tabs: { [index: number]: any }) => void): void;

/**
 * Shows a HTML5 Desktop notification and/or highlight the current tab.
 *
 * @param {GMNotificationOptions} details
 * @param {(click: boolean) => void} [ondone]
 */
declare function GM_notification(
  details: GMNotificationOptions,
  ondone?: (click: boolean) => void
): void;
declare function GM_notification(
  text: string,
  title?: string,
  image?: string,
  onclick?: () => void
): void;

/**
 * Copies data into the clipboard. The parameter 'info' can be an Object like "{ type: 'text', mimetype: 'text/plain'}" or just a string expressing the type ("text" or "html").
 *
 * @param {string} data
 * @param {(GMSetClipboardInfo | string)} info
 */
declare function GM_setClipboard(
  data: string,
  info: GMSetClipboardInfo | string
): void;
