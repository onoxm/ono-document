# randomString

生成指定长度的随机字符串，字符取自大小写字母和数字。

## 基础用法

```ts
randomString(8) // '3QS8eZWa'
randomString() // 默认 16 位
randomString(4.9) // 小数会被向下取整 → 实际 4 位
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
len|生成的字符串长度|<code>number</code>|<code>16</code>|否

## 注意事项

- 长度会先 `Math.floor` 向下取整：`randomString(4.9)` 得到 **4 位**，而不是 5 位。
- `len <= 0` 以及 `NaN`、`Infinity` 等**非有限值统一返回空字符串** `''`（旧实现传 `Infinity` 会死循环，现在不会）。
- 基于 `Math.random`，**不适合用作密钥、令牌等安全场景**，需要加密强度的随机值请用 `crypto.getRandomValues`。
