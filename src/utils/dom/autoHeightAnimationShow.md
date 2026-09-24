# autoHeightAnimationShow

以高度过渡的方式展开一个元素（`height: 0` → 内容实际高度）。

## 基础用法

```tsx
import { useRef, useState } from 'react'
import { autoHeightAnimationShow, autoHeightAnimationHide } from 'ono-react-element'

function App() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const toggle = () => {
    if (!panelRef.current) return
    open
      ? autoHeightAnimationHide(panelRef.current, 300)
      : autoHeightAnimationShow(panelRef.current, 300)
    setOpen(!open)
  }

  return (
    <div>
      <button onClick={toggle}>{open ? '收起' : '展开'}</button>
      <div
        ref={panelRef}
        style={{ overflow: 'hidden', height: 0, background: '#f5f5f5' }}
      >
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

- 它直接写元素的**行内样式**，请确保元素有 `overflow: hidden`，否则展开过程中内容会溢出显示。
- 展开分三步：先设 `height: auto` 量出真实高度 → 置回 `0` → 再过渡到量出的像素值。因此元素**必须已在文档中且可见**，`display: none` 时量到的高度是 0，动画会失效。
- **动画结束后高度停在测量时的固定像素值**，内容后续变化不会自动跟随。需要自适应后续内容时，在过渡结束时（`duration` 之后）把高度改回 `auto`。
- 展开与收起是**两个独立函数**，需要成对使用；没有「切换」的自协调逻辑，调用方要自己维护开关状态。
- 只做高度动画，不做淡入淡出、不处理透明度。
