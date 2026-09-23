# useClickOutSide
一个用于监听点击外部元素的 Hook。

## 基础用法
```tsx
import { useRef } from 'react'
import { useClickOutSide } from 'ono-react-element'

function App() {
  const btnRef = useRef<HTMLButtonElement>(null)

  useClickOutSide(btnRef, () => {
    window.alert('点击外部')
  })

  return (
    <div>
      <button
        ref={btnRef}
        onClick={() => {
          window.alert('点击我')
        }}
      >
        点击我
      </button>
      <button>点击外部</button>
    </div>
  )
}

export default App;
```

## 监听多个元素
第一个参数支持传数组，只要点击落在**任意一个**元素之外就会触发回调。
```tsx
import { useRef } from 'react'
import { useClickOutSide } from 'ono-react-element'

function App() {
  const firstRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  useClickOutSide([firstRef, secondRef], () => console.log('点到了外面'))

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <div ref={firstRef}>元素一</div>
      <div ref={secondRef}>元素二</div>
    </div>
  )
}

export default App;
```

## 自定义触发事件
默认监听 `click`，可以通过 `options.event` 换成别的事件，也支持传数组。
```tsx
import { useRef } from 'react'
import { useClickOutSide } from 'ono-react-element'

function App() {
  const boxRef = useRef<HTMLDivElement>(null)

  useClickOutSide(boxRef, () => console.log('点到了外面'), {
    event: ['mousedown', 'touchstart']
  })

  return <div ref={boxRef}>盒子</div>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
outsideElement|你想要监听的元素|<code>RefObject\<HTMLElement \| null></code>\|<code>HTMLElement</code>\|<code>(RefObject\<HTMLElement \| null> \| HTMLElement)[]</code>\|<code>null</code>|-|是
handler|点击到外部时执行的回调函数|<code>(e: MouseEvent) => void</code>|-|是
options|监听参数|<code>OutsideOptions</code>|-|否

### ClickEventTypes
类型|说明
:- | :- 
<code>'click'</code>|单击
<code>'contextmenu'</code>|右键菜单
<code>'mousedown'</code>|鼠标按下
<code>'mouseup'</code>|鼠标抬起
<code>'mousemove'</code>|鼠标移动
<code>'touchstart'</code>|触摸开始
<code>'touchend'</code>|触摸结束

### OutsideOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|你想要监听的事件类型，支持传数组|<code>ClickEventTypes</code>\|<code>ClickEventTypes[]</code>|<code>'click'</code>|否

## 注意事项
- `event` 传数组时**不允许出现重复项**，重复会直接抛错 `there are duplicates in the event type`。
- 判定依据是 `contains`：点击落在监听元素（含其子元素）内部时不会触发 `handler`。
- 传入的 `ref` 尚未挂载时（`ref.current` 为 `null`）该元素会被忽略；**如果所有元素都为空，任何点击都会被判定为「外部」并触发回调**，使用时要注意给 `ref` 一个稳定的挂载时机。
- 监听挂在 `window` 上，不需要自己处理解绑，组件卸载时会自动移除。
