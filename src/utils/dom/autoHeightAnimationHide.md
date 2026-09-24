# autoHeightAnimationHide

以高度过渡的方式收起一个元素（当前高度 → `height: 0`）。

## 基础用法

```tsx
import { useRef } from 'react'
import { autoHeightAnimationShow, autoHeightAnimationHide } from 'ono-react-element'

function App() {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <button onClick={() => autoHeightAnimationHide(panelRef.current!, 300)}>
        收起
      </button>
      <button onClick={() => autoHeightAnimationShow(panelRef.current!, 300)}>
        展开
      </button>
      <div ref={panelRef} style={{ overflow: 'hidden', background: '#f5f5f5' }}>
        <p style={{ margin: 0, padding: '12px' }}>这里是可展开的内容</p>
      </div>
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
el|目标元素|<code>HTMLElement</code>|-|是
duration|过渡时长（毫秒）|<code>number</code>|<code>300</code>|否

## 注意事项

- 只是把行内 `height` 置为 `0` 并加上 `transition`，所以元素**仍然占位**（不是 `display: none`）：宽度、外边距、边框都还在，只是高度变 0。需要彻底移出文档流请自己配合 `display` 或条件渲染。
- 必须在元素已有具体高度时调用才看得到过渡效果；如果之前是 `height: auto`，浏览器会直接从 auto 跳到 0，没有动画。配合 `autoHeightAnimationShow` 使用最稳妥。
- 元素需要有 `overflow: hidden`，否则内容会溢出显示在容器外。
- 动画期间元素内部的表单控件仍是可聚焦的，需要阻止交互请自己加 `pointer-events: none` 或 `inert`。
