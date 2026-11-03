# setDefaultOverlayContainer 全局浮层落点

一次性指定**全站浮层挂到哪里**，不用给每个组件逐个传 `getPopupContainer` / `getContainer`。主要面向 Shadow DOM、微前端、以及「浮层必须限制在某个局部渲染区」的宿主。

## 基础用法

Shadow DOM / 微前端宿主：浮层跟着触发元素的文档树走，否则挂到 `document.body` 会脱离宿主的样式隔离。

```ts
import { setDefaultOverlayContainer } from 'ono-react-element'

// 一处配置、全站生效
setDefaultOverlayContainer(trigger => {
  // trigger 可能为 null（Drawer / Dialog 这类没有触发元素的浮层）
  return (trigger?.getRootNode() as ShadowRoot) ?? null
})
```

把浮层限制在某个滚动容器 / 预览区内（浮层跟着容器滚，而不是固定在视口）：

```tsx
import { setDefaultOverlayContainer } from 'ono-react-element'
import { useEffect, useRef } from 'react'

function App() {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDefaultOverlayContainer(() => previewRef.current)
    return () => setDefaultOverlayContainer(null)
  }, [])

  return (
    <div ref={previewRef} style={{ position: 'relative', overflow: 'auto', height: 320 }}>
      {/* 这里的 Popover / Select 都会挂进这个 div */}
    </div>
  )
}

export default App;
```

恢复成「不接管」：

```ts
setDefaultOverlayContainer(null)
```

## 落点优先级

从高到低，逐级回退：

优先级|来源|说明
:- | :- | :-
1|组件上的 <code>getPopupContainer</code> / <code>getContainer</code>|显式指定，最高
2|<code>setDefaultOverlayContainer</code> 的全局默认|本页这两个函数
3|自动探测|触发元素在 Modal / Drawer 里时挂进该弹窗容器
4|触发元素所在的文档树|Shadow DOM 感知的兜底

⚠️ 第 1、2 级的解析器返回 `null` 表示「**这一级不接管**」，会继续往下走，而不是真的挂到 `null`。

## 两个族的 prop 名不同

浮层分两族，全局默认对两族都生效，但各自组件上的 prop 名沿用 antd 的分法：

族|组件|组件 prop
:- | :- | :-
popup 系|Popover / Tooltip / Popconfirm / Select / ContextMenu|<code>getPopupContainer</code>
弹窗系|Modal / Drawer / Dialog / Message / Toast|<code>getContainer</code>

两者都**低于**各自组件上的 prop。

## API

### setDefaultOverlayContainer

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
resolver|容器解析函数；传 <code>null</code> 复原为「不接管」|<code>PopupContainerResolver</code> \| <code>null</code>|-|是

返回 `<code>void</code>`。

### getDefaultOverlayContainer

无参数，返回当前设置的解析函数（没设置时为 `null`）。组件内部用它，宿主想读取当前配置也可以调。

### PopupContainerResolver

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
triggerNode|触发浮层的元素；Drawer / Dialog 这类没有触发元素的场景是 <code>null</code>|<code>HTMLElement</code> \| <code>null</code>|-|-

返回值 `<code>Element \| DocumentFragment \| null</code>`。返回 `null` 表示不接管。常见三种写法：

写法|效果
:- | :-
<code>document.body</code>|原来的默认行为
自己的容器（shadow root / 子应用根 / 局部预览区）|portal 到中间层
<code>triggerNode.parentElement</code>|≈ 不 portal（原地渲染）

## 注意事项

- ⚠️ **只在浮层打开的那一刻读一次**，不是订阅式：改全局默认不会让已经打开的浮层搬家，也不会触发重渲染。
- ⚠️ Drawer / Dialog / TemplateDialog **不传 `getContainer` 时是原地渲染**，而它们传给解析器的 `triggerNode` 恒为 `null`。所以给它们用的全局默认要写成**返回常量**的形式（`() => shadowRoot`）；`trigger => trigger?.getRootNode()` 这类写法拿到 `null` 会返回 `null` ⇒ 保持原地（对它们是安全的，不会误搬）。
- ⚠️ **显式指定的容器如果在 Modal / Drawer 之外，浮层会被 top layer / 遮罩盖住，而且不会报任何错**。只有明确知道自己在做什么（Shadow DOM / 微前端）时才覆盖自动探测那一级。
- 全局默认是**模块级单例**，不是 Provider：库本身不引入任何 `createContext`。代价是 SSR 下跨请求共享 —— 本库本就依赖 `document` / `window`，属于客户端库。
- 容器要能承载 portal 出来的节点：`ShadowRoot` 这类 `DocumentFragment` 也可以，内部不依赖 `document.getElementById`（它穿不透 shadow root）。
