# isBase64

判断字符串是否为 base64 编码格式。

## 基础用法

```ts
const str = 'abc'
const str1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA'

isBase64(str) // false
isBase64(str1) // true
```

只带数据部分、不带 `data:` 前缀的 base64 串同样能识别：

```ts
const data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

isBase64(data) // true
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|待检测的字符串|<code>string</code>|-|是

## 注意事项

- 判定分两条路径：
  1. 命中 `/^data:image\/([a-zA-Z]*);base64,([^\s]*)$/` 直接返回 `true`。注意这条正则**只认 `data:image/…`**，`data:text/plain;base64,…` 这类会落到第二条路径上再判断。
  2. 否则按「纯 base64 数据」检查：长度必须是 4 的倍数，字符集为 `A-Za-z0-9+/` 且 `=` 只能出现在末尾。
- 长度 ≤ 100 的字符串只要通过上面的格式检查就返回 `true`，**不会真正解码验证**；长度超过 100 才用 `btoa(atob(str)) === str` 做往返校验。
- 非字符串入参、空字符串一律返回 `false`。
