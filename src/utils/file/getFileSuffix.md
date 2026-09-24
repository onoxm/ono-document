# getFileSuffix

获取文件后缀名（不含点号）。

## 基础用法

```ts
getFileSuffix('a/b/c.png') // 'png'
getFileSuffix('archive.tar.gz') // 'gz'，只取最后一段
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
fileName|文件名或文件路径|<code>string</code>|-|是

## 注意事项

- **没有扩展名时会返回整个字符串**：`getFileSuffix('abc')` 得到 `'abc'`，不是空字符串。用它的结果直接做后缀比较前，建议先判断原串里是否有 `.`。
- 空字符串返回 `''`。
- 只按最后一个 `.` 切分，所以 `'a.min.js'` 得到 `'js'`，`'a.'` 得到 `''`。
- 返回值**不含点号**，拼接时需要自己加：`.${getFileSuffix(name)}`。
