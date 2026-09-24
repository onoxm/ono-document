# getElementCenterPosition

获取元素的中心点坐标。

## 基础用法

```tsx
import { useRef, useState } from 'react'
import { getElementCenterPosition } from 'ono-react-element'

function App() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const measure = () => {
    if (!boxRef.current) return
    setPos(getElementCenterPosition(boxRef.current))
  }

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: '200px', height: '80px', background: '#eee', margin: '24px' }}
      />
      <button onClick={measure}>测量中心点</button>
      <p>
        x: {pos.x}, y: {pos.y}
      </p>
    </div>
  )
}

export default App;
```

三种参照系：

```ts
getElementCenterPosition(el) // 相对视口
getElementCenterPosition(el, 'page') // 相对整页（含滚动偏移）
getElementCenterPosition(el, 'parent') // 相对父元素的中心点
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
el|目标元素|<code>HTMLElement</code>|-|是
relativeTo|参照系|<code>'viewport'</code>\|<code>'page'</code>\|<code>'parent'</code>|<code>'viewport'</code>|否

返回值|<code>{ x: number; y: number }</code>
:- | :-

### RelativeToType

类型值|说明
:- | :-
<code>viewport</code>|相对视口，等于 <code>getBoundingClientRect()</code> 下的中心点
<code>page</code>|相对整页，在视口坐标上叠加 <code>pageXOffset</code> / <code>pageYOffset</code>
<code>parent</code>|相对父元素的中心点，返回的是**两个中心点之差**，不是元素在父容器里的偏移

## 注意事项

- 读取的是布局信息，会触发**强制重排**。不要放进高频回调（`scroll`、`mousemove`）里无节制地调，必要时用 `rafTimeout` / `throttle` 包一层。
- `relativeTo` 传 `'parent'` 时若元素没有父节点，会**回退成相对视口**，不会报错也不是返回 `{ x: 0, y: 0 }`。
- 元素隐藏（`display: none`）时 `getBoundingClientRect()` 全为 0，得到的是 `{ x: 0, y: 0 }` 这类无意义结果，测量前先确保元素已渲染。
