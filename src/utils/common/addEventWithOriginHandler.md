# addEventWithOriginHandler

给元素添加事件处理器，同时保留元素上原有的处理器（原有的先执行）。

## 基础用法

```tsx
import { useEffect, useRef } from 'react'
import { addEventWithOriginHandler } from 'ono-react-element'

function App() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!btnRef.current) return

    // 保留元素上已有的 onclick，再追加新的处理逻辑
    addEventWithOriginHandler(btnRef.current, 'onclick', e => {
      console.log('新增的处理逻辑', e)
    })
  }, [])

  return <button ref={btnRef}>点击</button>
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
element|目标 DOM 元素|<code>HTMLElement</code>|-|是
event|事件名，目前支持 onclick 与 onmousemove|<code>'onclick'</code>\|<code>'onmousemove'</code>|-|是
handler|新增的处理函数|<code>(e: MouseEvent) =&gt; void</code>|-|是

## 注意事项

- 采用的是**覆盖式**绑定：直接给 `element[event]` 赋一个新函数（内部会先调用原函数）。同一个元素上对同一事件重复调用，会层层包裹，触发时按调用顺序依次执行。
- 只支持 `onclick` 和 `onmousemove` 两个属性名，传别的事件名不会报错，但也不会生效。
- 它操作的是 DOM 元素上的 `on*` 属性，与 React 的合成事件（`onClick` prop）是两套体系，不会互相清除，但执行顺序不由 React 保证。
- 元素上原本没有该属性时会正常工作，只是没有「原函数」可先执行。
