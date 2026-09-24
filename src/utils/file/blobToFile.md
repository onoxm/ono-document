# blobToFile

把 `Blob` 转成 `File` 对象。

## 基础用法

```ts
const file = blobToFile(blob, 'avatar.png')

const formData = new FormData()
formData.append('file', file)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
blob|待转换的 Blob|<code>Blob</code>|-|是
filename|文件名|<code>string</code>|<code>'abc.jpg'</code>|否

## 注意事项

- 不传 `filename` 会得到 `abc.jpg` 这个默认名字，同时 `type` 仍是原 `blob.type`，**名字和类型可能对不上**（比如一个 PNG 的 blob 叫 `abc.jpg`）。上传前建议显式传名字。
- 只是给同一份数据套一层 `File`，**不复制内容**，不会产生额外的内存拷贝。
- `lastModified` 由构造函数自动填当前时间。
