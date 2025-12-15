# isBase64
判断字符串是否为base64编码

## 示例
```ts
const str = 'abc'
const str1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA'

isBase64(str) // false
isBase64(str1) // true
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
base64|base64字符串|<code>string</code>|-|是
