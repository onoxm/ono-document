# upperString

把字符串或数字转换为大写字符串。

## 基础用法

```ts
upperString('abc') // 'ABC'
upperString('a-b_c') // 'A-B_C'
upperString(123) // '123'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|字符串或数字|<code>string</code>\|<code>number</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- 内部走的是 `toLocaleUpperCase()`，会跟随运行环境的本地化规则，因此与 `toUpperCase()` 的结果在个别语言下可能不同。
- 传入数字不会报错，返回的是字符串。
- 配套的小写版本是 `lowerString`。
