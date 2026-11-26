# useTruncated
检测元素内容是否溢出（被裁剪），常用于「展开 / 收起」按钮的显隐。

## 基础用法
把 `ref` 挂到被测元素上，`truncated` 就是「内容被裁掉了一部分」的布尔值。
```tsx
import { useTruncated } from 'ono-react-element'

function App() {
  const { ref, truncated } = useTruncated<HTMLDivElement>()

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 200,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        这段文字足够长，两行放不下，会被裁掉一部分。
      </div>
      {truncated && <button>展开</button>}
    </div>
  )
}

export default App;
```

## 展开 / 收起
`truncated` 只描述**当前这一刻**有没有溢出，所以展开之后它会自动变回 `false`。
如果按钮的显示条件只写 `truncated`，展开的瞬间按钮就消失了 —— 用户再也收不回去。要把自己的展开状态一起算进去。
```tsx
import { useState } from 'react'
import { useTruncated } from 'ono-react-element'

function App() {
  const [expanded, setExpanded] = useState(false)
  const { ref, truncated } = useTruncated<HTMLDivElement>()
  const canToggle = expanded || truncated

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 200,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 3,
          WebkitBoxOrient: 'vertical'
        }}
      >
        这段文字足够长，三行放不下，会被裁掉一部分。展开后完整显示。
      </div>
      {canToggle && (
        <button onClick={() => setExpanded((v) => !v)}>
          {expanded ? '收起' : '展开'}
        </button>
      )}
    </div>
  )
}

export default App;
```

## 返回值
参数|说明|类型
:- | :- | :-
ref|挂到被测元素上，元素类型由泛型决定|<code>RefObject&lt;T \| null&gt;</code>
truncated|内容是否溢出容器（被裁剪）|<code>boolean</code>

## API
不接收运行参数，只有一个泛型 `T` 用来指定被测元素的类型：
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
T（泛型）|被测元素类型，决定 <code>ref</code> 能挂到哪种元素上|<code>HTMLElement</code> 的子类型|<code>HTMLElement</code>|否

## 注意事项
- **泛型要显式写**：`useTruncated()` 的返回类型是 `RefObject<HTMLElement | null>`，它**不能**赋给 `RefObject<HTMLDivElement | null>`（React 的 ref 类型是不变的）。挂到 `div` 上请写 `useTruncated<HTMLDivElement>()`。
- 判定依据是 `scrollWidth - clientWidth > 1` **或** `scrollHeight - clientHeight > 1`，任一方向成立即为 `true`。所以单行 `text-overflow: ellipsis` 与多行 `-webkit-line-clamp` 都适用，不需要为两种裁剪方式换写法。
- 那 1px 是**容差**：差值必须**严格大于** 1 才算溢出，亚像素舍入导致的 1px 误差不会误报。
- 它回答的是「内容有没有超出盒子」，**不是**「CSS 有没有画出省略号」。没写 `text-overflow` 也照样可能为 `true` —— 只要你需要按钮显隐，这个语义通常正是想要的。
- 会在三种时机重算：盒子尺寸变化（`ResizeObserver`）、文字或子节点变化（`MutationObserver`，覆盖「盒子尺寸没变但文字换了」）、字体加载完成（`document.fonts.ready`，避免自定义字体晚到导致宽度判断失真）。
- **元素晚挂载不会补上观察**：effect 的依赖数组是空的，只在挂载后跑一次。如果那一刻 `ref.current` 还是 `null`（例如用条件渲染 `<div ref={ref}>`，或者之后把 `ref` 换成另一个元素），函数直接返回且不再重试，`truncated` 会**恒为 `false`**。请把 `ref` 挂在一个始终存在的元素上。
- 首次渲染返回的 `truncated` 是 `false`，真实结果在 layout effect 里同步写入 —— 发生在浏览器绘制之前，正常看不到闪烁；但在 SSR 与首屏 HTML 里它就是 `false`。
- 环境里没有 `ResizeObserver` / `MutationObserver` 时不会抛错，只是退化成「挂载时 + 字体就绪时」各算一次，后续变化不再更新。
- 卸载后会断开两个 observer，并用一个标记拦住字体就绪的异步回调，避免卸载后写 state。
