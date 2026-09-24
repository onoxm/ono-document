# isPureNumber

判断字符串是否只由 0 - 9 的数字组成。

## 基础用法

```ts
isPureNumber('123') // true
isPureNumber('007') // true

isPureNumber('12.3') // false，小数点不算
isPureNumber('-1') // false，负号不算
isPureNumber('') // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|待检测的字符串|<code>string</code>|-|是

## 注意事项

- 判定规则就是 `/^\d+$/`：**不允许空字符串、小数点、正负号、空格**，也不允许 `1e3` 这类科学计数法。
- 全角数字 `'１２３'` 不算通过。
- 需要「提取出数字」而不是「判断纯数字」时用 `pureNumber` / `getAllNumbers`。
