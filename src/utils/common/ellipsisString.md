# ellipsisString
截取字符串

## 示例
```ts
const str = '1234567890'
ellipsisString(str, 3, 9) // '123...0'
ellipsisString(str, 3, -1) // '123...0'
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|字符串|<code>string</code>|-|是
start|开始索引|<code>number</code>|-|是
end|结束索引|<code>number</code>|-|是
