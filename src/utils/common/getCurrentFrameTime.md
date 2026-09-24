# getCurrentFrameTime

测量当前这一帧的渲染耗时。

## 基础用法

```ts
const frameTime = await getCurrentFrameTime() // 约 16.7（60Hz 屏幕上的一帧）
```

常用来估算设备刷新能力，决定动画用多高的刷新频率：

```ts
import { getCurrentFrameTime } from 'ono-react-element'

async function pickFrameDelay() {
  const frameTime = await getCurrentFrameTime()

  // 一帧的耗时越短，说明刷新率越高，动画可以跑得更密
  return frameTime < 10 ? 16 : 33
}
```

## API

返回值|<code>Promise&lt;number&gt;</code>（该帧耗时，单位毫秒）
:- | :-

## 注意事项

- 源码文件名为 `getOptimalRefreshSpeed.ts`，**导出名却是 `getCurrentFrameTime`**，import 时别按文件名写。
- 它只是在 `requestAnimationFrame` 回调触发的时刻减去 `performance.now()` 起点，测量的是**一帧实际等了多久**，会被当前主线程负载影响。要拿稳定的刷新率估算，建议连续跑几次取平均或最小值。
- 返回的 Promise 依赖 `requestAnimationFrame`。页面处于后台标签页时 raf 会暂停，`await` 会一直挂着，别在切后台的场景里等它。
