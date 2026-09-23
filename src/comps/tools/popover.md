# Popover 气泡卡片
点击或悬停元素时弹出气泡卡片，适合承载「标题 + 内容」这类稍重的信息。

## 基础用法
不传 `trigger` 时是**点击触发**。

```tsx
import { Button, Popover } from 'ono-react-element'

function App() {
  return (
    <Popover content="这是一段内容">
      <Button>Click</Button>
    </Popover>
  )
}

export default App;
```

## 悬停触发
```tsx
import { Popover } from 'ono-react-element'

function App() {
  return (
    <Popover content="这是一段内容" trigger="hover">
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Popover>
  )
}

export default App;
```

## 标题与内容
```tsx
import { Button, Popover } from 'ono-react-element'

function App() {
  return (
    <Popover
      title="卡片标题"
      content="卡片内容，可以是一段稍长的说明文字。"
    >
      <Button>Click</Button>
    </Popover>
  )
}

export default App;
```

## 默认展开
```tsx
import { Popover } from 'ono-react-element'

function App() {
  return (
    <Popover content="这是一段内容" defaultOpen>
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Popover>
  )
}

export default App;
```

## 受控显示
传 `open` 后变成受控，配合 `onOpenChange` 自己管理显示状态。

```tsx
import { useState } from 'react'
import { Button, Popover } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button onClick={() => setOpen(!open)}>切换</Button>
      <Popover
        content="这是一段内容"
        open={open}
        onOpenChange={setOpen}
      >
        <Button>受控的气泡卡片</Button>
      </Popover>
    </div>
  )
}

export default App;
```

## 隐藏箭头
```tsx
import { Popover } from 'ono-react-element'

function App() {
  return (
    <Popover content="这是一段内容" trigger="hover" isShowArrow={false}>
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Popover>
  )
}

export default App;
```

## 自定义方位
`placement` 的取值与 Popper 一致，见文末的 `PlacementType`。

```tsx
import { Button, Popover } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 10, padding: 40 }}>
      <Popover content="上方" placement="top">
        <Button>top</Button>
      </Popover>
      <Popover content="右侧" placement="right">
        <Button>right</Button>
      </Popover>
      <Popover content="左下" placement="bottom-start">
        <Button>bottom-start</Button>
      </Popover>
    </div>
  )
}

export default App;
```

## 自定义内容宽度与样式
`overlayStyle` / `overlayClassName` 作用在内层内容容器上，`style` / `className` 作用在浮层上。

```tsx
import { Button, Popover } from 'ono-react-element'

function App() {
  return (
    <Popover
      content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      overlayStyle={{ width: 300 }}
      overlayClassName="my-popover-content"
    >
      <Button>Click</Button>
    </Popover>
  )
}

export default App;
```

## 自定义边框颜色
默认没有边框（`borderColor` 被设为 `transparent`），需要边框时自己传色值。

```tsx
import { Button, Popover } from 'ono-react-element'

function App() {
  return (
    <Popover content="这是一段内容" borderColor="#52c41a">
      <Button>Click</Button>
    </Popover>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|触发元素，单个 React 元素时会被注入 ref 用于定位|<code>ReactNode</code>|-|是
title|卡片标题|<code>ReactNode</code>|-|否
content|卡片内容|<code>ReactNode</code>|-|否
trigger|触发方式|<code>'hover'</code>\|<code>'click'</code>\|<code>'focus'</code>\|<code>'contextmenu'</code>|<code>'click'</code>|否
placement|浮层相对触发元素的方位|<code>PlacementType</code>|<code>'top'</code>|否
isShowArrow|是否显示箭头|<code>boolean</code>|<code>true</code>|否
overlayClassName|内层内容容器的类名|<code>string</code>|-|否
overlayStyle|内层内容容器的样式|<code>CSSProperties</code>|-|否
className|浮层类名|<code>string</code>|-|否
style|浮层样式|<code>CSSProperties</code>|-|否
borderColor|浮层边框与箭头颜色|<code>string</code>|<code>'transparent'</code>|否
sameWidth|浮层宽度是否跟随触发元素|<code>boolean</code>|<code>false</code>|否
autoAdjustOverflow|空间不足时自动翻转方位|<code>boolean</code>|<code>true</code>|否
arrowPointAtCenter|箭头是否指向触发元素的中心|<code>boolean</code>|<code>false</code>|否
disabled|禁用后只渲染触发元素，不再弹出浮层|<code>boolean</code>|<code>false</code>|否
defaultOpen|是否默认展开（非受控）|<code>boolean</code>|<code>false</code>|否
open|受控的展开状态|<code>boolean</code>|-|否
onOpenChange|展开状态变化回调|<code>(isVisible: boolean) => void</code>|-|否
mouseDelay|<code>hover</code> 触发的延迟（ms），可分别设置进入与离开|<code>number</code>\|<code>\{ enter: number; leave: number \}</code>|<code>200</code>|否
zIndex|浮层层级|<code>number</code>|<code>999</code>|否
popperOptions|透传给 <code>@popperjs/core</code> 的配置|<code>Partial\<Options></code>|<code>\{\}</code>|否

### PlacementType
类型|说明
:- | :- 
<code>'top'</code>|上方居中
<code>'top-start'</code>|上方靠左
<code>'top-end'</code>|上方靠右
<code>'bottom'</code>|下方居中
<code>'bottom-start'</code>|下方靠左
<code>'bottom-end'</code>|下方靠右
<code>'left'</code>|左侧居中
<code>'left-start'</code>|左侧靠上
<code>'left-end'</code>|左侧靠下
<code>'right'</code>|右侧居中
<code>'right-start'</code>|右侧靠上
<code>'right-end'</code>|右侧靠下

## 注意事项
- Popover 的 `trigger` 默认是 `'click'`，而底层的 PopoverBase 默认是 `'hover'` —— 只有 Popover 把默认值改成了点击。
- 浮层通过 Portal 渲染到 `document.body`，不受父级 `overflow` 裁剪；但也因此不在触发元素的子树里 —— `trigger="click"` 时点击浮层内部会被判定为「点击外部」而关闭，需要在浮层里放可交互内容时请改用受控的 `open` + `onOpenChange`。
- 浮层默认是深色底、白字、13px 字号、最大宽度 300px，且 `borderColor` 被固定为 `transparent`（无边框）。要改成浅色卡片请用 `className` / `overlayStyle` 覆盖背景与文字色。
- `title`、`content` 都是可选的，两者都不传时浮层是空的。
- 方位参数名是 `placement`（不是 `position`）；`color`、`borderRadius`、`padding` 这些参数在源码里并不存在，请用 `overlayStyle`（内容容器）或 `style`（浮层）传。
