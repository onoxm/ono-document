# useMouseClick
用于获取鼠标点击位置的 Hook。

## 基础用法
监听 `window` 上的 `click`，每次点击后返回该次事件的坐标。
```tsx
import { useMouseClick } from 'ono-react-element'

function App() {
  const { clientX, clientY, pageX, pageY, screenX, screenY } = useMouseClick()

  return (
    <p>
      最近一次点击：({clientX}, {clientY})
    </p>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
clientX|相对视口左边缘的横坐标|<code>number</code>
clientY|相对视口上边缘的纵坐标|<code>number</code>
pageX|相对文档左边缘的横坐标（含滚动距离）|<code>number</code>
pageY|相对文档上边缘的纵坐标（含滚动距离）|<code>number</code>
screenX|相对屏幕左边缘的横坐标|<code>number</code>
screenY|相对屏幕上边缘的纵坐标|<code>number</code>

## 注意事项
- 未发生过点击前，六个坐标都是 `0`，用它做判断时要先区分「点在了 (0, 0)」和「还没点过」。
- 监听挂在 `window` 上，页面任意位置的点击都会刷新这组坐标，无法区分事件来源元素。
- 每次点击都会触发一次状态更新；只想知道「点的是哪个元素」的话，用元素自己的 `onClick` 更合适。
