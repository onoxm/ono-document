# isValidColor

判断字符串是否是合法的颜色格式。

## 基础用法

```ts
isValidColor('#fff') // true
isValidColor('#ffffff') // true
isValidColor('rgb(255, 255, 255)') // true

isValidColor('#ffff') // false
isValidColor('#ffffff80') // false
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
clr|待校验的颜色字符串|<code>string</code>|-|是

## 注意事项

- 只认 **3 位 / 6 位十六进制** 和 **`rgb(r, g, b)`**（逗号后可有空格，数字 1 - 3 位）两类。
- 下面这些都属于「浏览器能解析、但这里判为 false」：8 位带透明度的 hex、`rgba(...)`、`hsl(...)`、CSS 颜色关键字。
- 判定是整串匹配，前后有多余字符或空格就会失败。
- 需要区分具体是哪种格式时用 `getColorType`。
