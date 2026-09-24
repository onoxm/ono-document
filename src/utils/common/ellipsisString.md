# ellipsisString

挖掉字符串中间的一段，用 `...` 把两侧接起来；挖掉的长度不超过 3 时原样返回。

## 基础用法

```ts
const str = '1234567890'

ellipsisString(str, 3, 9) // '123...0'
ellipsisString(str, 3, -1) // '123...0'，负数下标从字符串末尾往前数
```

被截掉的长度太少（≤ 3）时不做任何处理，避免出现「省略号比内容还长」：

```ts
ellipsisString('1234567890', 3, 5) // '1234567890'，只挖掉 2 个字符
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|原始字符串|<code>string</code>|-|是
start|开始下标，支持负数|<code>number</code>|-|是
end|结束下标，支持负数|<code>number</code>|<code>str.length</code>|否

## 注意事项

- 它**不是取子串**，而是「挖掉 `[start, end)` 后把首尾拼起来」，所以保留的是两端的内容。
- `start >= str.length` 时直接返回原字符串。
- 下标越界会被夹到 `0 ~ str.length`；`start > end` 时两者会自动交换。
