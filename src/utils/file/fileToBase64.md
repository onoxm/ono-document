# fileToBase64

把 `File` 转成 base64 字符串，**结果包含 data URL 前缀，可直接当图片地址使用**。

## 基础用法

```ts
const base64 = await fileToBase64(file)

img.src = base64 // 直接拿来预览，不用再拼前缀
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|待转换的 File|<code>File</code>|-|是

返回值|<code>Promise&lt;string&gt;</code>（形如 <code>data:image/png;base64,xxxx</code>）
:- | :-

## 注意事项

- 与 `blobToBase64` 的区别就在前缀：**这个带前缀**（内部直接返回 `reader.result`），那个不带。
- 内部走 `FileReader.readAsDataURL`，**没有 `onerror` 处理**，读取失败时 Promise 会一直挂着，不会 reject。
- 前缀里的 MIME 取自文件的 `type`；如果文件本身没有 `type`（比如手动构造的 `File`），前缀会是 `data:application/octet-stream` 之类，浏览器可能不按图片渲染。
- base64 体积约为原文件的 1.37 倍，只适合小图预览；大文件请用 `URL.createObjectURL`。
- 反过来把带前缀的 base64 转回文件用 `base64ToFile`。
