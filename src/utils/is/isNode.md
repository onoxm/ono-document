# isNode

当前运行环境是否为 Node.js（**布尔值，不是函数**）。

## 基础用法

```ts
import { isNode } from 'ono-react-element'

if (isNode) {
  console.log('服务端环境')
}
```

## API

它是**常量**，直接当布尔值用：

类型|说明
:- | :-
<code>boolean</code>|<code>globalThis.process?.versions?.node</code> 是否存在

## 注意事项

- 判定依据是 `process.versions.node`，比单纯检测 `typeof process !== 'undefined'` 更准：一些打包器会注入一个空的 `process` 垫片，那种情况下这里仍然返回 `false`。
- 在浏览器里访问 `globalThis.process` 是安全的（用 `!= null` 判断），不会抛错。
- Electron 渲染进程里同时存在 `window` 和 `process`，此时 `isNode` 与 `isBrowser` **会同时为 `true`**，分支逻辑要注意顺序。
