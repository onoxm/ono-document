# lowerString

把字符串或数字转换为小写字符串。

## 基础用法

```ts
lowerString('ABC') // 'abc'
lowerString('AbC-123') // 'abc-123'
lowerString(123) // '123'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|字符串或数字|<code>string</code>\|<code>number</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- 内部先 `toString()` 再 `toLowerCase()`，所以传数字不会报错，返回的是字符串。
- 用的是 `toLowerCase` 而非本地化版本，土耳其语等特殊语言的 `I` / `i` 转换可能与预期不同；需要本地化大小写规则时用 `upperString` 那种 `toLocale` 系列。
