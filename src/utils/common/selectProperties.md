# selectProperties
批量获取/排除元素属性

## 示例
```ts
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }

selectProperties(obj, ['a', 'b', 'c']) // { a: 1, b: 2, c: 3 }
selectProperties(obj, ['a', 'b', 'c'], false) // { d: 4, e: 5 }
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
obj|对象|<code>object</code>|-|是
properties|属性名|<code>string</code>|-|是
include|是否包含属性|<code>boolean</code>|<code>true</code>|否
