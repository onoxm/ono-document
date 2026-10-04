# useWindowSize
用于实时获取浏览器窗口宽高的 Hook。

## 基础用法
挂载后立即取一次当前窗口尺寸，之后监听 `resize` 事件持续更新。
```tsx
import { useWindowSize } from 'ono-react-element'

function App() {
  const { width, height } = useWindowSize()

  return (
    <p>
      当前窗口：{width} × {height}
    </p>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
width|窗口宽度（取自 <code>window.innerWidth</code>）|<code>number</code>
height|窗口高度（取自 <code>window.innerHeight</code>）|<code>number</code>

## 注意事项
- 取的是**视口**尺寸（`innerWidth` / `innerHeight`），包含滚动条占位，与 `document.body` 的尺寸不一定相等。
- 首次渲染时返回 `{ width: 0, height: 0 }`，真实尺寸要等挂载后的 effect 写入，因此首屏可能出现一帧 `0`。
- 每次 `resize` 都会触发一次 React 状态更新，缩放窗口期间会连续重渲染；只偶尔读一次宽度的话，直接取 `window.innerWidth` 更省。
