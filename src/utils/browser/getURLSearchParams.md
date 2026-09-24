# getURLSearchParams

读取当前页面的查询参数：不传参返回全部，传参返回单个值。

## 基础用法

```ts
// 当前地址：https://example.com/list?page=2&tab=all

getURLSearchParams() // { page: '2', tab: 'all' }
getURLSearchParams('page') // '2'
getURLSearchParams('notExist') // null
```

## API

函数带重载，两种用法：

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
param|参数名，不传则返回全部参数|<code>string</code>|-|否

返回值|<code>Record&lt;string, string&gt;</code>（不传参）或 <code>string \| null</code>（传参）
:- | :-

## 注意事项

- **SSR 安全**：`typeof window === 'undefined'` 时返回空对象 `{}`，不会抛错。但注意此时**传了 `param` 也会返回 `{}` 而不是 `null`**，服务端渲染时的空值判断要按对象处理。
- 返回值都是**字符串**，`?page=2` 拿到的是 `'2'` 不是 `2`，比大小前记得转换。
- 取不到指定参数时返回 `null`（浏览器环境下），不是 `undefined`、也不是空字符串。
- 值**会**被 `URLSearchParams` 自动解码：`?q=a%20b` 得到 `'a b'`，这一点与 `parseQuery` 不同（后者不解码）。
- 同名参数出现多次时，`get()` 取到**第一个**值；需要全部时请自己用 `getAll()`。
- 读的是 `window.location.search`，只反映**当前页面地址**；解析任意字符串请用 `parseQuery` 或 `URLSearchParams`。
