# captureFrame

截取视频在指定时间点的一帧，返回 `Blob` 和预览 URL。

## 基础用法

```ts
const { blob, url } = await captureFrame(videoFile, 3.5) // 截取第 3.5 秒

img.src = url // 直接当图片预览
```

URL 与页面上的 video 元素都可以：

```ts
await captureFrame('https://example.com/demo.mp4', 2)
await captureFrame(videoRef.current!, 2)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
video|视频元素、文件或地址|<code>HTMLVideoElement</code>\|<code>File</code>\|<code>string</code>|-|是
time|截取时间点（秒）|<code>number</code>|-|是

返回值|<code>Promise&lt;{ blob: Blob; url: string }&gt;</code>
:- | :-

## 注意事项

- 返回的 `url` 是 `URL.createObjectURL` 生成的 blob URL，**不会自动释放**。不再使用时请自己 `URL.revokeObjectURL(url)`，否则会持续占用内存。
- 传 `HTMLVideoElement` 时它会**改写元素状态**：设置 `muted = true`、`autoplay = true` 并跳转 `currentTime`。如果页面上正在播放这个视频，画面会被跳到指定时间点。
- 传 `File` 时会新建一个隐藏的 `video` 元素，同样不会插进文档，但也没有清理逻辑。
- 等待的是 `oncanplay` 事件，且**没有超时**：视频源不可用（地址错误、格式不支持）时 Promise 会一直挂着，不会 reject。URL 场景建议自己加超时。
- 截取时机受视频关键帧影响，实际画面可能与你传的 `time` 有偏差。
