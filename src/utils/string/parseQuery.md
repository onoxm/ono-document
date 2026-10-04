# parseQuery

解析 URL 里的查询参数，返回键值对象。

## 基础用法

```ts
parseQuery('https://example.com/list?page=1&size=20') // { page: '1', size: '20' }
parseQuery('/path?keyword=react') // { keyword: 'react' }
parseQuery('no-query') // {}
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|待解析的 URL 字符串|<code>string</code>|-|是

返回值|<code>Record&lt;string, string&gt;</code>
:- | :-

## 注意事项

- 用的是全局正则 `/([^?=&]+)=([^&]+)/g` 扫描**整串**，不是真的按 URL 结构解析，因此：
  - 值**不会**做 `decodeURIComponent`，`?a=hello%20world` 得到的是 `'hello%20world'`；
  - 哈希里的 `#k=v` 也会被当成参数取出来；
  - 重复的键**后者覆盖前者**：`'x=1&x=2'` 得到 `{ x: '2' }`。
- 没有值的键（`?flag`）不会被收录；值里带 `&` 或 `=` 的内容会被截断。
- 需要严格按 URL 规范解析时用 `getURLSearchParams` 或浏览器原生 `URLSearchParams`。
