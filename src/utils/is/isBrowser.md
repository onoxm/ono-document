# isBrowser

当前运行环境是否为浏览器（**布尔值，不是函数**）。

## 基础用法

```ts
import { isBrowser } from 'ono-react-element'

if (isBrowser) {
  window.localStorage.setItem('theme', 'dark')
}
```

## API

它是**常量**，直接当布尔值用：

类型|说明
:- | :-
<code>boolean</code>|<code>window</code> 与 <code>window.document</code> 是否都存在

## 注意事项

- **SSR 安全**：用的是 `typeof window !== 'undefined'`，在 Node 里 import 这个模块不会抛错，可以直接用它做「只在浏览器执行」的分支判断。
- 判定的是「有没有 window/document」，因此 jsdom、Happy DOM 这类测试环境里也会返回 `true`。
- 想判断「是不是 Node」用 `isNode`。
