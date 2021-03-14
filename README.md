<!--
 * @Date: 2021-03-09 14:10:07
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-03-14 17:35:21
-->

# tampermonkey-webpack-plugin

- Insert UserScriptHeaderComment to output file

- Code hot reload with webpack-dev-server

- Full typescript support

- or just use template <https://github.com/lisonge/tampermonkey-webpack-template.git>

## Installation

```shell
pnpm i -D tampermonkey-webpack-plugin
```

## Usage

### production mode

```ts
import { TampermonkeyWebpackPlugin } from 'tampermonkey-webpack-plugin';
new TampermonkeyWebpackPlugin({
  minAlignSpace: 4,
  header: {
    author: 'author',
    name: ['Tampermonkey-hot', ['zh', '油猴脚本-热重载']],
    description: ['description', ['zh', '描述']],
    namespace: 'https://dev.songe.li/',
    icon: 'https://cdn.jsdelivr.net/gh/lisonge/src@main/svg/tampermonkey.svg',
    version: '1.0.1',
    include: [/https:\/\/dev\.songe\.li.*/, 'https://dev.songe.li/*'],
    grant: ['unsafeWindow', 'GM_setValue', 'GM_setValue', 'GM_xmlhttpRequest'],
    externals: [['tag', 'value']],
  },
});
```

```shell
npx webpack --mode=production --progress --config webpack.config.ts
```

### development mode

```ts
import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TampermonkeyWebpackPlugin } from 'tampermonkey-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';


export default {
  devtool: 'inline-source-map', // necessary
  output: {
    publicPath: 'http://127.0.0.1:8080/', // necessary
  },
  plugins: [
    new TampermonkeyWebpackPlugin({
      minAlignSpace: 4,
      header: {
        author: 'author',
        name: ['Tampermonkey-hot', ['zh', '油猴脚本-热重载']],
        description: ['description', ['zh', '描述']],
        namespace: 'https://dev.songe.li/',
        icon:
          'https://cdn.jsdelivr.net/gh/lisonge/src@main/svg/tampermonkey.svg',
        version: '1.0.1',
        include: [/https:\/\/dev\.songe\.li.*/, 'https://dev.songe.li/*'],
        grant: [
          'unsafeWindow',
          'GM_setValue',
          'GM_setValue',
          'GM_xmlhttpRequest',
        ],
        externals: [['tag', 'value']],
      },
      devServer: {
        proxyUserJsFileName: 'dev-server-proxy.user.js',
      },
    }),
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    filename: 'index.js', // necessary
    disableHostCheck: true, // necessary
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }, // necessary
  } as WebpackDevServerConfiguration,
} as Configuration;
```

```shell
npx webpack serve --mode=development --config webpack.config.ts
```

your console will log `proxy script url`, it should be `http://${host}:${port}/${proxyUserJsFileName}`

if the url end with '.user.js', visit it in the browser address bar

tampermonkey will auto guide the installation

## Note

According to the way tampermonkey works, when use webpack-dev-server

in fact your code will work between `origin-host` and `server-host`

so we need to modify some configuration

```ts
const host = '127.0.0.1';
const port = 8080;

// webpack-dev-server hot-reload default use relative path
// code will work between `origin-host` and `server-host`
// we need set absolute URL
config.output.publicPath = `http://${host}:${port}/`;

// tampermonkey use single .js file
config.devtool = 'inline-source-map';

config.devServer = {
  host,
  port,
  filename: 'index.js', // because config.ouput.filename may use [hash], so devServer.filename must be static
  disableHostCheck: true, // code will work between `origin-host` and `server-host`
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }, // code will work between `origin-host` and `server-host`
};
```
