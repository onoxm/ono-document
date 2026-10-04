# ContainBox 缩放容器
让 **div、span 这类非替换元素**在固定尺寸的容器里按比例等比缩放，相当于给普通元素加一个 `object-fit: contain`。

## 基础用法
容器用 `size` 指定固定尺寸；子元素必须有**显式的行内宽高**，否则不会被缩放：

```tsx
import { ContainBox } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <ContainBox size={{ width: 240, height: 180 }}>
        <div
          style={{
            width: 100,
            height: 300,
            background: '#6366f1',
            color: '#fff',
            borderRadius: 8
          }}
        >
          100 × 300
        </div>
      </ContainBox>
      <ContainBox size={{ width: 240, height: 180 }}>
        <div
          style={{
            width: 400,
            height: 100,
            background: '#f97316',
            color: '#fff',
            borderRadius: 8
          }}
        >
          400 × 100
        </div>
      </ContainBox>
    </div>
  )
}

export default App;
```

## 叠加内容
`content` 渲染在子元素之上，由容器 flex 居中：

```tsx
import { ContainBox } from 'ono-react-element'

function App() {
  return (
    <ContainBox
      size={{ width: 240, height: 180 }}
      content={
        <span
          style={{
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '2px 8px',
            borderRadius: 4
          }}
        >
          标注
        </span>
      }
    >
      <div style={{ width: 400, height: 100, background: '#f97316' }} />
    </ContainBox>
  )
}

export default App;
```

## 点击穿透
`isPenetrate` 让子元素不接收鼠标事件，方便点击命中上层 `content`：

```tsx
import { useState } from 'react'
import { ContainBox } from 'ono-react-element'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ContainBox
      size={{ width: 240, height: 180 }}
      isPenetrate
      content={
        <button onClick={() => setCount(count + 1)}>点了 {count} 次</button>
      }
    >
      <div style={{ width: 240, height: 180, background: '#e5e7eb' }} />
    </ContainBox>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|容器内容（非替换元素），有显式行内宽高才按比例缩放|<code>ReactNode</code>|-|否
size|容器固定尺寸，数字按 px 处理|<code>{ width: string \| number; height: string \| number }</code>|-|否
content|叠加在 children 之上的内容，容器自动居中|<code>ReactNode</code>|-|否
isPenetrate|children 是否穿透点击（<code>pointer-events: none</code>）|<code>boolean</code>|<code>false</code>|否
className|自定义类名|<code>string</code>|-|否
onClick|点击容器的回调|<code>(e: MouseEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否
onDragOver|拖拽经过时的回调|<code>(e: DragEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否
onDrop|放下文件时的回调|<code>(e: DragEvent&lt;HTMLDivElement&gt;) =&gt; void</code>|-|否

## 注意事项
- 只对**显式写了行内宽高**（`style.width` 与 `style.height` 都在元素上）的子元素做 contain 缩放；没写宽高的子元素保持原样，并会被清掉 `transform`。
- ⚠️ 容器自己得先能算出尺寸：`size` 不传时要有确定的宽高（父级约束或 `className` 里写死），否则 `clientWidth` / `clientHeight` 为 `0`，缩放会静默不生效。
- 缩放用 `transform: scale()` 实现：子元素的**渲染尺寸**变了，但**布局占位**仍是原始尺寸。
- 容器尺寸变化时靠 `ResizeObserver` 重算；组件卸载时会清掉子元素上残留的 `transform`。
- 这是给**非替换元素**用的（div / span / canvas 等）。`img` / `video` 这类替换元素请用 `ContainMediaBox` —— 它有原生 `object-fit`，不需要 JS 计算。
