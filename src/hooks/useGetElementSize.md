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
target|测量目标：元素、<code>ref</code>，或返回元素的函数|<code>HTMLElement</code>\|<code>RefObject\<HTMLElement \| null></code>\|<code>() => HTMLElement \| RefObject\<HTMLElement \| null></code>|<code>window</code>|否

## 注意事项
- 首次渲染返回 `{ w: 0, h: 0 }`，真实尺寸要等挂载后的 effect 写入，首屏会有一帧 `0`。
- 测量元素时取的是 `ResizeObserver` 的 `borderBoxSize`，**含 padding 与 border**。
- 观察动作只在 effect 执行时做一次：如果那一刻目标还没挂载（`ref.current` 为 `null`），后续不会自动补上，需要让 `target` 的引用发生变化才能重新观察。
- 传元素时窗口的 `resize` 监听仍然注册着，只是不再用于更新尺寸。
