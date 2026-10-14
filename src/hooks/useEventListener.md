# useEventListener
用于监听事件的 Hook，支持一次监听多个事件、指定目标元素。

## 基础用法
不传 `target` 时默认监听 `window`。
```tsx
import { useEventListener } from 'ono-react-element'

function App() {
  useEventListener('click', (e: Event) => {
    console.log('点击事件触发了！', e)
  })

  return <div>点击页面任意位置</div>
}

export default App;
```

## 监听指定元素
`target` 支持直接传元素，也支持传 `ref`（`ref.current` 为空时会回落到 `window`）。
```tsx
import { useRef } from 'react'
import { useEventListener } from 'ono-react-element'

function App() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEventListener(
    'mouseenter',
    () => console.log('鼠标进入元素'),
    {
      target: boxRef, // 想要监听的目标元素
      listenerOptions: { passive: true } // 透传给 addEventListener
    }
  )

  return <div ref={boxRef}>Hover</div>
}

export default App;
```

## 一次监听多个事件
`event` 支持传数组，回调里可以用 `e.type` 区分是哪一个事件。
```tsx
import { useEventListener } from 'ono-react-element'

function App() {
  useEventListener(['click', 'contextmenu'], (e: Event) => {
    console.log('事件类型：', e.type)
  })

  return <div>单击或右键</div>
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
event|你想要监听的事件类型，支持传数组|<code>string</code>\|<code>string[]</code>|-|是
handler|事件触发时执行的回调函数|<code>(e: Event) => void</code>|-|是
options|监听参数|<code>EventListenerOptions</code>|-|否

### EventListenerOptions
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
target|你想要监听的目标元素|<code>EventTarget</code>\|<code>RefObject\<EventTarget \| null></code>\|<code>null</code>|<code>window</code>|否
listenerOptions|透传给 <code>addEventListener</code> 的第三个参数|<code>boolean</code>\|<code>AddEventListenerOptions</code>|-|否

## 注意事项
- `handler` 内部用 ref 保存，**每次渲染都取最新的回调**，所以不存在 `deps` 参数：回调里读到的是最新的 state / props，也不会因为回调函数重写而重新绑定监听。
- 只有 `event`、`target`、`listenerOptions` 三者变化时才会解绑并重新监听。
- `listenerOptions` 是 effect 依赖项之一，**直接传对象字面量（如 `{ passive: true }`）会导致每次渲染都解绑重绑** —— 每次渲染的对象引用都不同。需要传配置时，把它提到组件外部或用 `useMemo` 固定引用。
- `event` 传数组时会分别注册，组件卸载时按同样的列表统一解绑。
- `target` 传 `ref` 而元素尚未挂载（`ref.current` 为 `null`）时，会回落到 `window`，而不是静默失效。
- **元素事后才挂载也不会自动切回来**：`target` 传 `ref` 时，effect 的依赖项就是这个 `ref` 对象本身（引用稳定），元素晚挂载后 effect 不会再跑，监听会**一直留在 `window` 上**。实测对条件渲染的元素：元素挂载之后点击页面空白处，回调依然被触发。想让监听在这种情况下落到元素上，得让 `target` 的引用本身发生变化 —— 例如把元素存进 `useState`（`ref={setEl}` 之后传 `target: el`），或把 `useEventListener` 写在「元素已经挂载」的那个组件里。
- **`target` 不支持函数形式**：只能传 `EventTarget` 或 `ref` 对象。传 `() => ref.current` 会在挂载时抛 `TypeError: targetElement.addEventListener is not a function`（注意 `useGetElementSize` 是支持函数形式的，两者不一样）。
