# Portal 传送门
把子节点渲染到指定的 DOM 容器里（默认 `document.body`），用来让浮层脱离父级的 `overflow` 裁剪与层叠上下文。

## 基础用法
不传 `to` 时挂到 `document.body`：

```tsx
import { Portal } from 'ono-react-element'

function App() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: 60 }}>
      <span>父级设置了 overflow: hidden</span>
      <Portal>
        <div
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            padding: '8px 12px',
            background: '#333',
            color: '#fff',
            borderRadius: 6
          }}
        >
          我挂在 body 上，不会被父级裁掉
        </div>
      </Portal>
    </div>
  )
}

export default App;
```

## 指定挂载容器
`to` 支持 CSS 选择器、DOM 节点，或返回节点的函数（惰性求值，每次渲染都会调用）：

```tsx
import { useRef } from 'react'
import { Portal } from 'ono-react-element'

function App() {
  const hostRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div
        ref={hostRef}
        style={{ position: 'relative', height: 120, background: '#f5f5f5' }}
      />
      <Portal to={() => hostRef.current}>
        <div style={{ padding: 8 }}>渲染到 hostRef 里面</div>
      </Portal>
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|要传送的内容|<code>ReactNode</code>|-|是
to|挂载目标，不传则挂到 <code>document.body</code>|<code>string</code>\|<code>Element</code>\|<code>DocumentFragment</code>\|<code>() =&gt; Element \| DocumentFragment \| null</code>|-|否

## 注意事项
- 目标解析不到时**降级到 `document.body`**（选择器匹配失败、函数返回 `null` 都算），不会抛错 —— 同一次渲染里目标可能还没挂载。
- 类型里的 `DocumentFragment` 是给 **Shadow DOM** 留的：`ShadowRoot` 继承的是 `DocumentFragment` 而不是 `Element`，只写 `Element` 会让 `to` 指向 shadow root 时编译不过。
- `to` 传函数时每次渲染都会调用一次，适合指向「此刻才存在」的节点；已经在文档里的固定节点直接传引用即可。
- Portal 只负责换挂载点，不做动画、不管理层级 —— 层级由目标容器与内容自身的样式决定。
