# firstLetter2Capitalize

把字符串的首字母转成大写。

## 基础用法

```ts
firstLetter2Capitalize('hello') // 'Hello'
firstLetter2Capitalize('1abc') // '1abc'，首字符不是字母时原样返回
firstLetter2Capitalize('') // ''
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|原始字符串|<code>string</code>|-|是

## 注意事项

- 只处理第一个字符，其余部分保持原样（`'hello world'` → `'Hello world'`）。
- 用的不是驼峰转换：`'hello-world'` 得到 `'Hello-world'`，不会去掉分隔符。
- 传入非字符串或空字符串时返回空字符串。
