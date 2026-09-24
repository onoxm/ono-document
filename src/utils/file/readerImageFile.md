# readerImageFile

把图片文件（`File` / `Blob`）读成已加载完成的 `HTMLImageElement`。

## 基础用法

```ts
const input = document.querySelector('input[type="file"]')

input?.addEventListener('change', async e => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const img = await readerImageFile(file)
  console.log(img.width, img.height)
})
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
file|图片文件|<code>File</code>\|<code>Blob</code>|-|是
options|回调配置|<code>ReaderImageFileOptions</code>|-|否

### ReaderImageFileOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onReaderLoad|FileReader 读完时触发，收到 <code>ProgressEvent</code>|<code>(e: ProgressEvent&lt;FileReader&gt;) =&gt; void</code>|-|否
onImageLoad|图片解码完成时触发，收到 <code>HTMLImageElement</code>|<code>(img: HTMLImageElement) =&gt; void</code>|-|否

返回值|<code>Promise&lt;HTMLImageElement&gt;</code>
:- | :-

## 注意事项

- `onImageLoad` 与 Promise 的 resolve **同时发生**，两者拿到的都是同一个 `img`；用它只是为了少写一层 `await`。
- 加载失败时 Promise 会 **reject**（图片解码失败或读取失败都会），记得 `catch`。
- 返回的 `img.src` 是 base64 data URL（`readAsDataURL` 的产物），**不涉及 blob URL，没有需要释放的资源**；代价是大图会让内存里多出一份 base64 字符串。
- 与 `loadImage` 的区别：这个的入参只能是 `File` / `Blob`，返回的 `img.src` 是 base64；`loadImage` 支持传 URL，传文件时用的是 blob URL 并在结束后自动释放。
- 不处理跨域：data URL 本身是同源的，但如果你把图片画到 canvas 上再做导出，data URL 来源不会有污染问题（这是相对 blob URL 的一个优势）。
