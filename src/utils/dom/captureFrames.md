# captureFrames

批量截取视频在多个时间点的帧。

## 基础用法

```ts
const frames = await captureFrames(videoFile, [0.5, 2, 5.5])

frames.forEach(({ url }, i) => {
  const img = document.createElement('img')
  img.src = url
  img.alt = `第 ${i} 帧`
  document.body.appendChild(img)
})
```

常用于生成视频缩略图墙或抽帧做首图选择。

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
video|视频元素、文件或地址|<code>HTMLVideoElement</code>\|<code>File</code>\|<code>string</code>|-|是
times|截取时间点数组（秒）|<code>number[]</code>|-|是

返回值|<code>Promise&lt;{ blob: Blob; url: string }[]&gt;</code>（顺序与 <code>times</code> 一致）
:- | :-

## 注意事项

- 内部并发调用 `captureFrame`，用 `Promise.all` 汇总，所以**任意一帧失败都会让整个 Promise reject**，已经成功的那几帧拿不到（并且它们的 blob URL 也没人释放）。
- 传 `File` / URL 时它只创建**一个** `video` 元素，所有时间点复用同一个元素并排设置 `currentTime`，并发跳帧的表现取决于浏览器，密集抽帧建议自己串行处理。
- 返回的 blob URL 同样**不会自动释放**，批量抽帧时尤其要注意逐个 `URL.revokeObjectURL`。
- 与 `captureFrame` 一样没有超时保护，视频源不可用时会一直等待。
