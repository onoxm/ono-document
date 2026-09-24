# mediaAutoplayPolicies

检测浏览器是否允许**带声音**的自动播放，并据此决定后续行为。

## 基础用法

```tsx
import { useEffect, useRef } from 'react'
import { mediaAutoplayPolicies } from 'ono-react-element'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    mediaAutoplayPolicies(
      videoRef.current,
      () => console.log('可以带声音自动播放'),
      () => console.log('只能静音播放，需要引导用户点击')
    )
  }, [])

  return <video ref={videoRef} src="/demo.mp4" playsInline />
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
media|视频或音频元素|<code>HTMLVideoElement</code>\|<code>HTMLAudioElement</code>|-|是
onSuccess|允许有声自动播放时执行|<code>() =&gt; void</code>|-|否
onFail|不允许有声自动播放时执行|<code>() =&gt; void</code>|-|否

## 注意事项

- 函数会**真的调用 `media.play()`**，并且一开始就把 `muted` 置为 `true`。检测通过后它会把 `muted` 改回 `false`，检测不通过则**保持静音状态继续播放**——不存在「不播」的分支。
- 检测手段是创建一个 `AudioContext` 看 `state` 是否为 `running`，判定完立刻 `close()`。部分浏览器在 `AudioContext` 上会有告警或需要用户手势，控制台可能看到相关提示。
- 在明确的用户手势（点击）里调用，`onSuccess` 分支更容易命中。
- 只做检测与回调，**不返回任何值**，也不返回 Promise。
