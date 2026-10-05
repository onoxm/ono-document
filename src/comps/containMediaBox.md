# ContainMediaBox 媒体缩放容器
给 `img` / `video` 这类**替换元素**套一个固定尺寸的容器，用原生 `object-fit: contain` 保持比例自适应 —— 不变形、不裁切，纯 CSS 实现，没有 JS 计算的布局开销。

## 基础用法
横图、竖图都会等比缩放到容器内：

```tsx
import { ContainMediaBox } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <ContainMediaBox size={{ width: 200, height: 200 }}>
        <img src="https://picsum.photos/800/600" alt="" />
      </ContainMediaBox>
      <ContainMediaBox size={{ width: 200, height: 200 }}>
        <img src="https://picsum.photos/400/1200" alt="" />
      </ContainMediaBox>
    </div>
  )
}

export default App;
```

## video 用法
`video` 自身的属性直接写在元素上：

```tsx
import { ContainMediaBox } from 'ono-react-element'

function App() {
  return (
    <ContainMediaBox size={{ width: 320, height: 180 }}>
      <video
        src="https://example.com/demo.mp4"
        autoPlay
        loop
        muted
        controls
        playsInline
        preload="auto"
      />
    </ContainMediaBox>
  )
}

export default App;
```

## 叠加内容与点击穿透
`content` 渲染在媒体层之上；`isPenetrate` 让媒体层不接收鼠标事件，方便点击命中 `content`：

```tsx
import { useState } from 'react'
import { ContainMediaBox } from 'ono-react-element'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ContainMediaBox
      size={{ width: 240, height: 180 }}
      isPenetrate
      content={
        <button onClick={() => setCount(count + 1)}>点了 {count} 次</button>
      }
    >
      <img src="https://picsum.photos/800/600" alt="" />
    </ContainMediaBox>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|容器内容，用于 img / video 等替换元素|<code>ReactNode</code>|-|否
size|容器固定尺寸，数字按 px 处理|<code>{ width: string \| number; height: string \| number }</code>|-|否
content|叠加在 children 之上的内容，容器自动居中|<code>ReactNode</code>|-|否
isPenetrate|children 是否穿透点击（<code>pointer-events: none</code>）|<code>boolean</code>|<code>false</code>|否
className|自定义类名|<code>string</code>|-|否
onClick|点击容器的回调|<code>(e: MouseEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否
onDragOver|拖拽经过时的回调|<code>(e: DragEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否
onDrop|放下文件时的回调|<code>(e: DragEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否

## 注意事项
- 容器会强制把媒体层里的 `img` / `video` 设为 `width: 100%` + `height: 100%` + `object-fit: contain`，所以你**不用**在子元素上自己写宽高，写了也会被容器覆盖。
- ⚠️ 只对 `img` / `video` 生效：其他元素（如 `div`）不会被设置 `object-fit`，也不会缩放。要在容器里缩放普通元素请用 `ContainBox`。
- 容器需要有确定的尺寸（`size` 或父级约束 / `className`），否则媒体层是 `0 × 0`，什么都看不见。
- `content` 层通过 `position: relative` + `z-index: 1` 压在绝对定位的媒体层之上，不需要自己加层级。
- 与 `ContainBox` 的区别：这个组件**纯 CSS**，子元素用原生 `object-fit`；`ContainBox` 走 JS 计算 `transform: scale()`，适用于非替换元素。
