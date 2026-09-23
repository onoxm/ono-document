# Tooltip 文字提示
鼠标悬停时在元素旁显示一段简短说明。

## 基础用法
默认 `hover` 触发、显示在元素上方。

```tsx
import { Tooltip } from 'ono-react-element'

function App() {
  return (
    <Tooltip content="这是一段内容">
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Tooltip>
  )
}

export default App;
```

## 点击触发
```tsx
import { Button, Tooltip } from 'ono-react-element'

function App() {
  return (
    <Tooltip content="这是一段内容" trigger="click">
      <Button>Click</Button>
    </Tooltip>
  )
}

export default App;
```

## 默认展开
```tsx
import { Tooltip } from 'ono-react-element'

function App() {
  return (
    <Tooltip content="这是一段内容" defaultOpen>
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Tooltip>
  )
}

export default App;
```

## 隐藏箭头
```tsx
import { Tooltip } from 'ono-react-element'

function App() {
  return (
    <Tooltip content="这是一段内容" isShowArrow={false}>
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Tooltip>
  )
}

export default App;
```

## 自定义方位
`placement` 透传给 Popper，取值见文末的 `PlacementType`。

```tsx
import { Button, Tooltip } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 10, padding: 40 }}>
      <Tooltip content="上方" placement="top">
        <Button>top</Button>
      </Tooltip>
      <Tooltip content="右侧" placement="right">
        <Button>right</Button>
      </Tooltip>
      <Tooltip content="左下" placement="bottom-start">
        <Button>bottom-start</Button>
      </Tooltip>
    </div>
  )
}

export default App;
```

## 自定义箭头颜色
浮层是深色底白字，`borderColor` 控制边框与箭头的颜色（默认 `#666`）。

```tsx
import { Tooltip } from 'ono-react-element'

function App() {
  return (
    <Tooltip content="这是一段内容" borderColor="#52c41a">
      <div style={{ width: 'fit-content' }}>Hover</div>
    </Tooltip>
  )
}

export default App;
```

## 受控显示
传 `open` 后变成受控，配合 `onOpenChange` 自己管理显示状态。

```tsx
import { useState } from 'react'
import { Button, Tooltip } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button onClick={() => setOpen(!open)}>切换</Button>
      <Tooltip
        content="这是一段内容"
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <Button>受控的提示</Button>
      </Tooltip>
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|触发元素，单个 React 元素时会被注入 ref 用于定位|<code>ReactNode</code>|-|是
content|提示内容|<code>ReactNode</code>|-|否
trigger|触发方式|<code>'hover'</code>\|<code>'click'</code>\|<code>'focus'</code>\|<code>'contextmenu'</code>|<code>'hover'</code>|否
placement|浮层相对触发元素的方位|<code>PlacementType</code>|<code>'top'</code>|否
isShowArrow|是否显示箭头|<code>boolean</code>|<code>true</code>|否
borderColor|边框与箭头颜色|<code>string</code>|<code>'#666'</code>|否
className|自定义类名，会同时加在内容容器与浮层上|<code>string</code>|-|否
style|浮层样式|<code>CSSProperties</code>|-|否
sameWidth|浮层宽度是否跟随触发元素|<code>boolean</code>|<code>false</code>|否
autoAdjustOverflow|空间不足时自动翻转方位|<code>boolean</code>|<code>true</code>|否
arrowPointAtCenter|箭头是否指向触发元素的中心|<code>boolean</code>|<code>false</code>|否
disabled|禁用后不再响应触发事件|<code>boolean</code>|<code>false</code>|否
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
- 默认 `hover` 触发且有 200ms 延迟（`mouseDelay`）；鼠标从触发元素移到浮层上不会关闭，移开后延迟关闭。
- 内容默认带 `fontWeight: bold` 与 `4px 8px` 的内边距；浮层本身是深色底（`#333`）白字、字号 13px、最大宽度 300px。
- `className` 会同时加在内容容器和浮层上，只想改浮层外观时请用 `style`。
- 浮层通过 Portal 渲染到 `document.body`，不受父级 `overflow` 裁剪；但也因此不在触发元素的子树里 —— `trigger="click"` 时点击浮层内部会被判定为「点击外部」而关闭。
- 内容为单段文字。需要「标题 + 内容」的多行卡片请用 Popover。
- `content` 在类型上是可选的，但不传就没有内容可显示，实际使用时应始终传入。
