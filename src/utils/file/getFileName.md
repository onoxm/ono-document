# getFileName

获取文件名（去掉扩展名）。

## 基础用法

```ts
getFileName('avatar.png') // 'avatar'
getFileName('archive.tar.gz') // 'archive.tar'，只去掉最后一段后缀
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
fileName|文件名或文件路径|<code>string</code>|-|是

## 注意事项

- ⚠️ **不要传不含 `.` 的字符串**。传入 `'a/b/c'`、`'avatar'` 这类没有扩展名的值会**无限递归直到栈溢出**（`Maximum call stack size exceeded`），直接把页面搞崩。
  安全用法是先确认有扩展名：
  ```ts
  const name = fileName.includes('.') ? getFileName(fileName) : fileName
  ```
- 传入的路径**不会自动去掉目录**：只有「没有扩展名」时才会剥掉目录部分再递归，所以 `getFileName('a/b/c.png')` 得到的是 `'a/b/c'`，仍带着路径。
- 以点开头的隐藏文件名会被截空：`getFileName('.gitignore')` 返回 `''`。
- 空字符串返回 `''`（这一条有前置判断，是安全的）。
- 只想拿后缀用 `getFileSuffix`。
