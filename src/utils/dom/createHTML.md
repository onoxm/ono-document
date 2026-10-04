# createHTML

把图片按像素转成 `box-shadow` 形式的 HTML 文件并触发下载。

## 基础用法

与 `createImageHTML` 的区别是：`createHTML` 接收**已经加载好的图片元素**和现成的 `canvas` / `ctx`，不再自己去做加载，适合你已经持有 `HTMLImageElement` 的场景。

```tsx
import { useRef } from 'react'
import { createHTML } from 'ono-react-element'

function App() {
  const imgRef = useRef<HTMLImageElement>(null)
  const cvsRef = useRef<HTMLCanvasElement>(null)

  const exportHTML = () => {
    const img = imgRef.current!
    const cvs = cvsRef.current!
    const ctx = cvs.getContext('2d')!

    // 尺寸必须显式传（原因见「注意事项」）
    createHTML(img, cvs, ctx, 'pixel-art.html', 200, 200)
  }

  return (
    <>
      <img ref={imgRef} src="/demo.png" crossOrigin="anonymous" />
      <canvas ref={cvsRef} hidden />
      <button onClick={exportHTML}>导出 HTML</button>
    </>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
img|已加载完成的图片元素|<code>HTMLImageElement</code>|-|是
cvs|用于绘制的 canvas 元素|<code>HTMLCanvasElement</code>|-|是
ctx|<code>cvs</code> 的 2D 上下文|<code>CanvasRenderingContext2D</code>|-|是
filename|输出文件名，未以 <code>.html</code> 结尾会自动补上|<code>string</code>|-|是
imageWidth|目标宽度（像素）|<code>number</code>|-|否
imageHeight|目标高度（像素）|<code>number</code>|-|否

## 注意事项

- ⚠️ **`imageWidth` / `imageHeight` 必须显式传**。不传时内部会把 `{ maxWidth: undefined, maxHeight: undefined }` 交给 `scaleSize`，而 `Object.assign` 会用 `undefined` **顶掉** `scaleSize` 里默认的 `1000`，宽高比因此算成 `NaN`、canvas 尺寸变成 `0`，**最终不会产出文件**（也不会报错）。
- 会把 canvas 调成缩放后的尺寸（改写 `cvs.width` / `cvs.height`），**复用同一个 canvas 时注意画布大小会被改变**。
- 尺寸由 `scaleSize` 决定，而它**默认允许放大**：传入的 `imageWidth` / `imageHeight` 比原图大时，会把图片放大到恰好顶满其中一条边。
- **逐像素采样**：输出体积与 `目标宽 × 目标高` 成正比，每个像素生成一条 `box-shadow` 声明。尺寸设大（如 1000 × 1000）会生成几十 MB 的 HTML，浏览器打开必卡。缩略图场景建议控制在 200 × 200 以内。
- 需要图片**同源或已开启 CORS**：跨域图片会污染 canvas，读取像素时抛安全错误。建议在 `<img>` 上加 `crossOrigin="anonymous"`。
- 函数内部自己触发下载，**没有返回值**。
- 需要 DOM 与 Canvas 环境，不能在 SSR 里跑。
