# drawVideo

把视频**当前帧**画到 canvas 并导出为图片 Blob。

## 基础用法

```tsx
import { useRef } from 'react'
import { drawVideo } from 'ono-react-element'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const grab = async () => {
    // 此时 video 需已加载、可绘制
    const { blob, url } = await drawVideo(videoRef.current!)

    // url 可直接预览，blob 可拿去上传
    console.log(url, blob.size)
  }

  return (
    <>
      <video ref={videoRef} src="/demo.mp4" controls />
      <button onClick={grab}>截取当前帧</button>
    </>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
video|视频元素|<code>HTMLVideoElement</code>|-|是

返回值|<code>Promise&lt;{ blob: Blob; url: string }&gt;</code>
:- | :-

## 注意事项

- ⚠️ **它不等待视频就绪**，只画「调用那一刻」的画面。视频还没解析出元数据时 `videoWidth` / `videoHeight` 为 `0`，canvas 就是 0 × 0，画不出内容 —— 调用前请自行确保已触发 `loadeddata` / `canplay`（至少 `loadedmetadata`）。
- 画的是**当前播放位置**的帧。要精确截某一秒，先设好 `video.currentTime` 并等 `seeked` 事件，再调用它（`captureFrame` 已帮你做了这段等待）。
- 导出格式是 canvas 默认的 **PNG**（`toBlob` 未指定 `type`），**不支持指定格式与质量**。
- 返回的 `url` 由 `URL.createObjectURL` 生成，**不会自动释放**，用完请 `URL.revokeObjectURL(url)`。
- ⚠️ 错误处理有个不一致点：`toBlob` 回调里抛出的错误**不会让返回的 Promise reject**（那种情况下 Promise 会**永远挂起**）；而「取不到 canvas 上下文」的 `throw` 发生在 Promise 执行器内，会正常 reject。依赖它做流程控制时请配套超时兜底。
- 需要 DOM 与 Canvas 环境，不能在 SSR 里跑。
