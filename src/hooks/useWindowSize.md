# useWindowSize
用于获取窗口宽高的 Hook。

> **⚠️ 已废弃**：本 Hook 仅为兼容保留，将在 **0.7.x** 移除，请改用不传参数的 [useGetElementSize](/hooks/useGetElementSize)。后者是它的严格超集：同样跟随窗口 `resize`，而且尺寸没有变化时不会触发无谓的重新渲染（`useWindowSize` 会）。

## 基础用法
```tsx
import { useWindowSize } from 'ono-react-element'

function App() {
  const { width, height } = useWindowSize()

  return (
    <p>
      窗口：{width} × {height}
    </p>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
width|窗口宽度，跟随 <code>resize</code> 更新|<code>number</code>
height|窗口高度，跟随 <code>resize</code> 更新|<code>number</code>

## 注意事项
- 内部是不传参数的 `useGetElementSize()` 的薄封装：拿到的 `w`、`h` 会被重新组装成 `{ width, height }`，并用 `useMemo` 固定引用 —— 尺寸没变时连续两次渲染返回的是**同一个对象**，可以安全地把它写进 `useEffect`、`useMemo` 的依赖数组。
- 首次渲染返回 `{ width: 0, height: 0 }`，真实尺寸在挂载后的 effect 里写入，首屏会有一帧 `0`。
- 在 SSR 或不提供 `ResizeObserver` 的环境下不做监听，返回值固定为 `{ width: 0, height: 0 }`。
- 需要跟踪的是**某个元素**（而不只是窗口）的尺寸时，改用 `useGetElementSize(ref)`。
- 迁移写法：`const { width, height } = useWindowSize()` 换成 `const { w, h } = useGetElementSize()`，字段名由 `width` / `height` 变成 `w` / `h`。
