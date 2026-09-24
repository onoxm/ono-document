# createImageHTML

把图片转成一个「用 `box-shadow` 画出来」的 HTML 文件并触发下载。

## 基础用法

```ts
await createImageHTML(file)

await createImageHTML('https://picsum.photos/600/400', {
  filename: 'pixel-art.html',
  imageWidth: 400,
  imageHeight: 400
})
```

这类输出常见于 HTML 邮件、单文件分享场景 —— 完全不依赖外部图片资源。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
image|图片元素、文件或地址|<code>HTMLImageElement</code>\|<code>File</code>\|<code>string</code>|-|是
options|配置项|<code>CreateImageHTMLOptions</code>|-|否

### CreateImageHTMLOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
filename|输出的 HTML 文件名|<code>string</code>|<code>'download.html'</code>|否
imageWidth|目标图片宽度（像素）|<code>number</code>|<code>1000</code>|否
imageHeight|目标图片高度（像素）|<code>number</code>|<code>1000</code>|否

## 注意事项

- **逐像素采样**：输出体积与 `imageWidth × imageHeight` 成正比，尺寸设大会生成几十 MB 的 HTML，浏览器打开也会卡。缩略图场景建议控制在 200 × 200 以内。
- 图片不是先缩放到目标尺寸再采样就是用 canvas 拉伸绘制，**宽高比会被强制拉伸到指定的 `imageWidth` × `imageHeight`**，需要保持比例请自己按原图比例算好这两个值。
- 传入 `File` / URL 时内部走 `loadImage`，因此**跨域图片会污染 canvas**，导致读取像素时报安全错误。跨域图请先在服务端代理或转成同源资源。
- 函数内部自己触发下载（`a.click()`），**没有返回值**，不需要再手动保存 `blob`。
- 需要 DOM 与 Canvas 环境，不能在 SSR 里跑。
