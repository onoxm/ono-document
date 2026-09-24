# changeUrlByParams

在 URL 后面追加查询参数。

## 基础用法

```ts
changeUrlByParams('/list', { page: 1, size: 20 }) // '/list?page=1&size=20'
changeUrlByParams('/list?from=home', { page: 1 }) // '/list?from=home&page=1'
```

条件参数直接把值留空即可 —— `undefined` 会被跳过：

```ts
changeUrlByParams('/search', { keyword: 'react', tag: undefined })
// '/search?keyword=react'，tag 不会出现
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|原始 URL|<code>string</code>|-|是
params|要追加的参数|<code>Record&lt;string, string \| number \| boolean \| null \| undefined&gt;</code>|-|是

返回值|<code>string</code>
##

## 注意事项

- **`undefined` 被跳过，`null` 会被写成字符串 `'null'`**，两者行为不同。想去掉某个参数请用 `undefined`。

  ```ts
  changeUrlByParams('/list', { a: null }) // '/list?a=null'
  ```

- 只做**追加**，不会覆盖 URL 里已有的同名参数。原始 URL 里已经带了 `?page=1`，再追加 `page=2` 会得到两个 `page`，解析时谁生效取决于后端 / `URLSearchParams` 的取值规则。
- 值的类型会被转成字符串，`true` 会变成 `'true'`；需要做 `encodeURIComponent` 的值由 `URLSearchParams` 自动编码。
- 参数全部无效时**返回原始 URL**，不会多出一个 `?`。
- 只在字符串层面拼接，不做 URL 合法性校验，`url` 里已有的 `#hash` 会被当成普通字符，参数会被追加到 hash 之后。
