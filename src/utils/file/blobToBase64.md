# blobToBase64

把 `Blob` 转成 base64 字符串。

## 基础用法

```ts
const base64 = await blobToBase64(blob)

// 注意：结果不带 data: 前缀，直接塞给 <img src> 是显示不出来的
console.log(base64) // 'iVBORw0KGgoAAAANSUhEUgAA...'
```

需要能直接当图片地址用时，自己补前缀：

```ts
const res = await fetch('/api/avatar')
const base64 = await blobToBase64(await res.blob())

img.src = `data:${res.headers.get('content-type')};base64,${base64}`
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
blob|待转换的 Blob|<code>Blob</code>|-|是

返回值|<code>Promise&lt;string&gt;</code>（**不含** data URL 前缀）
:- | :-

## 注意事项

- 返回的是 `dataUrl.split(',')[1]`，也就是**只有数据部分**，不含 `data:image/png;base64,` 这段。需要完整 data URL 请用 `fileToBase64`，或自己拼前缀。
- 内部走 `FileReader.readAsDataURL`，**没有 `onerror` 处理**：读取失败时 Promise 会一直挂着，不会 reject。对可靠性有要求时建议自己包一层超时。
- base64 体积约为原数据的 1.37 倍，大文件转换会明显占用内存。
- 相关的转换链：`urlToBase64` 也是走这个函数，所以同样不带前缀。
