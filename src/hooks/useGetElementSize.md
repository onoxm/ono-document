# useGetElementSize
用于获取元素或窗口宽高的 Hook。

## 基础用法
不传 `target` 时返回窗口宽高，并跟随窗口缩放更新。
```tsx
import { useGetElementSize } from 'ono-react-element'

function App() {
  const { w, h } = useGetElementSize()

  return (
    <p>
      窗口：{w} × {h}
    </p>
  )
}

export default App;
```

## 监听指定元素
`target` 可以直接传元素、`ref`，或一个返回元素的函数；元素尺寸变化时自动更新。
```tsx
import { useRef } from 'react'
import { useGetElementSize } from 'ono-react-element'

function App() {
  const boxRef = useRef<HTMLDivElement>(null)
  const { w, h } = useGetElementSize(boxRef)

  return (
    <div ref={boxRef} style={{ resize: 'both', overflow: 'auto' }}>
      拖拽右下角改变尺寸：{w} × {h}
    </div>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
w|目标元素宽度，未传元素时为窗口宽度|<code>number</code>
h|目标元素高度，未传元素时为窗口高度|<code>number</code>

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
target|测量目标：元素、<code>ref</code>，或返回元素 / <code>ref</code> 的函数（类型别名 <code>ElementSizeTarget</code>）|<code>ElementSizeTarget</code>|<code>window</code>|否

## 注意事项
- 首次渲染返回 `{ w: 0, h: 0 }`，真实尺寸要等挂载后的 effect 写入，首屏会有一帧 `0`。
- 测量元素时优先取 `ResizeObserver` 的 `borderBoxSize`（**含 padding 与 border**）；环境不提供 `borderBoxSize` 时回落到 `contentRect`。
- 传了 `target`、但那一刻元素还没挂载（例如 `ref.current` 仍是 `null`）时，**保持当前尺寸、不会退化成窗口尺寸**，也不会自动补上观察 —— 需要让 `target` 的引用发生变化，effect 才会再跑一次。
- 只有**不传** `target`（追窗口尺寸）时才会注册 `window` 的 `resize` 监听；传了 `target` 就不再监听它。
- `ResizeObserver` 每个组件实例只创建一次并跨渲染复用；尺寸没有变化时返回同一个 state 引用，不会因此多渲染一次。
- `target` 从 A 元素换成 B 元素时，会先解除对 A 的观察，再开始观察 B。
- 在 SSR / 没有 `ResizeObserver` 的环境下不做观察，返回值固定为 `{ w: 0, h: 0 }`。
