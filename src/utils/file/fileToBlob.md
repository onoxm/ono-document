# fileToBlob

把 `File` 转成 `Blob`。

## 基础用法

```ts
const blob = fileToBlob(file)

const url = URL.createObjectURL(blob)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|待转换的 File|<code>File</code>|-|是

返回值|<code>Blob</code>
:- | :-

## 注意事项

- 内部是 `file.slice(0, file.size, file.type)`：得到的是**同一份数据的 Blob 视图**，不复制内容，转换开销与文件大小无关。
- 因为 `File` 本身就是 `Blob` 的子类，这个函数主要是为了**去掉文件名、修改时间等 File 特有的字段**，让类型收窄到 `Blob`（比如有些接口只接受 `Blob`）。
- 返回值的 `type` 沿用原文件；原文件没有 `type` 时得到空字符串。
