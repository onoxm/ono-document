# loadImage

加载图片，返回加载完成的 `HTMLImageElement`。

## 基础用法

```ts
const img = await loadImage('https://picsum.photos/200/200')

document.body.appendChild(img)
```

本地文件同样可以：

```ts
const img = await loadImage(file)
canvas.getContext('2d')?.drawImage(img, 0, 0)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
image|图片 URL 或文件|<code>string</code>\|<code>File</code>|-|是

返回值|<code>Promise&lt;HTMLImageElement&gt;</code>
:- | :-

## 注意事项

- 传 `File` 时内部会 `URL.createObjectURL`，并在**加载成功或失败后自动 `revokeObjectURL`**；返回的 `img.src` 是已释放的 blob URL，不要拿它去渲染或再赋值给别的元素 —— 需要 URL 就自己重新 `createObjectURL(file)`。
- 加载失败时 Promise **reject**（`Failed to load image: <url>`），必须 `catch`，否则是未处理的 rejection。
- **不处理跨域**：没有设置 `crossOrigin`，加载跨域图片后直接画到 canvas 上会污染画布（`toDataURL` 抛安全错误）。需要读取像素时请改用 `getImageSize` 之外的方案，或自己带 `crossorigin="anonymous"` 的 `Image`。
- 与 `getImageSize` 的区别：这里返回完整的 `img` 元素，`getImageSize` 只返回宽高数值。
