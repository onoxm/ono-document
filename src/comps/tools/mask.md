# Mask 遮罩层
铺满视口、带半透明背景的遮罩容器，是 Drawer / TemplateDialog 的底座，也可以单独用来遮住页面。

## 基础用法
`Mask` 自带 flex 居中，塞进去的内容会居中压在遮罩上：

```tsx
import { useState } from 'react'
import { Button, Mask } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打开遮罩</Button>
      {open && (
        <Mask onClick={() => setOpen(false)}>
          <div
            style={{ padding: 24, background: '#fff', borderRadius: 8 }}
            onClick={e => e.stopPropagation()}
          >
            点遮罩关闭，点面板不关
          </div>
        </Mask>
      )}
    </div>
  )
}

export default App;
```

## 自定义遮罩颜色
背景写在 `style` 上：

```tsx
import { useState } from 'react'
import { Button, Mask } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打开遮罩</Button>
      {open && (
        <Mask style={{ background: 'rgba(86, 68, 184, 0.35)' }}>
          <span style={{ color: '#fff' }}>点我关闭</span>
        </Mask>
      )}
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性

`Mask` 就是一个 `<div>`，除 `children`、`className` 外的原生属性（`style`、`onClick`、`onContextMenu`、`data-*` 等）会原样透传。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|遮罩内的内容，会被 flex 居中|<code>ReactNode</code>|-|否
className|追加在 <code>ono-mask</code> 之后的类名|<code>string</code>|-|否

## 注意事项
- 遮罩自身是 `position: fixed` + `100vw × 100vh` + flex 居中，默认背景 `rgba(0, 0, 0, 0.5)`。
- 层级由 CSS 变量 `--ono-z-modal` 驱动（回退值 `1999`）。想整体调档改这个变量即可，不要在 `style` 里写 `z-index` —— 行内值会压死变量。
- 祖先元素带 `transform` / `filter` / `z-index` 时，`fixed` 定位的遮罩会被关进那个层叠上下文，也可能被 `overflow: hidden` 裁掉；这种情况把 `<Mask>` 放进 `<Portal>` 里渲染。
- `Mask` 本身不处理 Esc、也不锁定页面滚动，这些由使用它的浮层组件负责。
