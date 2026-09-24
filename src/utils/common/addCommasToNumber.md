# addCommasToNumber

给数字加千分位分隔符。

## 基础用法

```ts
addCommasToNumber(1234567.89) // '1,234,567.89'
addCommasToNumber(1234) // '1,234'
addCommasToNumber(-1234567) // '-1,234,567'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
num|需要格式化的数字|<code>number</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- **只接受 `number`**。传字符串（如 `'123'`）、`NaN` 都会抛 `Error: 请输入有效的数字`，从输入框拿到的值要先 `Number(...)` 转换。
- 只处理整数部分，小数部分原样保留；负数与科学计数法按 `toString()` 的结果切分，`1e21` 这类会有意外结果。
