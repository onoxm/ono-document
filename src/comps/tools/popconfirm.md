# Popconfirm 气泡确认框
点击元素后弹出一个气泡，让用户在「确定 / 取消」之间做二次确认。

## 基础用法
确定与取消都会先关闭气泡，再执行各自的回调。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      onConfirm={() => console.log('确定')}
      onCancel={() => console.log('取消')}
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 自定义按钮文字
```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      content="删除后无法恢复"
      okText="删除"
      cancelText="再想想"
      onConfirm={() => console.log('确定')}
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 自定义按钮组
`btnBarDom` 的入参是 `{ OkBtn, CancelBtn, handleClose }`，它们都是组件（用 `<OkBtn />` 渲染），点击行为已经绑好。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      btnBarDom={({ OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      )}
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 默认打开
```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm title="这是一段内容" defaultOpen>
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 受控显示
```tsx
import { useState } from 'react'
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button onClick={() => setOpen(!open)}>切换</Button>
      <Popconfirm
        title="这是一段内容"
        open={open}
        onOpenChange={setOpen}
      >
        <Button>受控的确认框</Button>
      </Popconfirm>
    </div>
  )
}

export default App;
```

## 隐藏箭头与自定义样式
```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      isShowArrow={false}
      overlayStyle={{ width: 220 }}
      placement="bottom-start"
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 自定义方位
`placement` 的取值与 Popper 一致，见文末的 `PlacementType`。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', gap: 10, padding: 40 }}>
      <Popconfirm title="上方" placement="top">
        <Button>top</Button>
      </Popconfirm>
      <Popconfirm title="右侧" placement="right">
        <Button>right</Button>
      </Popconfirm>
      <Popconfirm title="左下" placement="bottom-start">
        <Button>bottom-start</Button>
      </Popconfirm>
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|触发元素，单个 React 元素时会被注入 ref 用于定位|<code>ReactNode</code>|-|是
title|气泡标题，也是主要文案|<code>ReactNode</code>|-|否
content|气泡内容，作为标题下方的补充说明|<code>ReactNode</code>|-|否
okText|确定按钮文字|<code>string</code>|<code>'确定'</code>|否
cancelText|取消按钮文字|<code>string</code>|<code>'取消'</code>|否
onConfirm|点击确定后触发|<code>() => void</code>|<code>() => {}</code>|否
onCancel|点击取消后触发|<code>() => void</code>|<code>() => {}</code>|否
btnBarDom|自定义按钮组，入参为 <code>({ OkBtn, CancelBtn, handleClose })</code>|<code>(params) => ReactNode</code>|取消 + 确定两个按钮|否
trigger|触发方式，内部固定为 <code>'click'</code>，传其它值可以覆盖|<code>'hover'</code>\|<code>'click'</code>\|<code>'focus'</code>\|<code>'contextmenu'</code>|<code>'click'</code>|否
placement|气泡相对触发元素的方位|<code>PlacementType</code>|<code>'top'</code>|否
isShowArrow|是否显示箭头|<code>boolean</code>|<code>true</code>|否
disabled|禁用后只渲染触发元素，不再弹出气泡|<code>boolean</code>|<code>false</code>|否
defaultOpen|是否默认展开（非受控）|<code>boolean</code>|<code>false</code>|否
open|受控的展开状态|<code>boolean</code>|-|否
onOpenChange|展开状态变化回调|<code>(open: boolean) => void</code>|<code>() => {}</code>|否
overlayClassName|内层内容容器的类名|<code>string</code>|-|否
overlayStyle|内层内容容器的样式|<code>CSSProperties</code>|-|否
className|浮层类名|<code>string</code>|-|否
style|浮层样式|<code>CSSProperties</code>|-|否
borderColor|浮层边框与箭头颜色|<code>string</code>|<code>'transparent'</code>|否
sameWidth|浮层宽度是否跟随触发元素|<code>boolean</code>|<code>false</code>|否
autoAdjustOverflow|空间不足时自动翻转方位|<code>boolean</code>|<code>true</code>|否
arrowPointAtCenter|箭头是否指向触发元素的中心|<code>boolean</code>|<code>false</code>|否
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
- 确定与取消都是**先关闭气泡、再执行回调**，并且会额外触发一次 `onOpenChange(false)`。
- `disabled` 时组件直接返回 `children`，不会渲染任何浮层结构。
- `children` 建议传单个 React 元素（组件会 `cloneElement` 注入 ref 做定位）；传纯文本时会自动包一层 `div`。
- 浮层通过 Portal 渲染到 `document.body`，不受父级 `overflow` 裁剪；但也因此不在触发元素的子树里 —— 点击气泡内部（例如标题区域）会被判定为「点击外部」而关闭。确定 / 取消按钮本身也是关闭行为，所以不受影响。
- 点击触发时同时监听 `contextmenu`，在触发元素上点右键也会切换气泡。
- `title`、`content` 在类型上都是可选的，但两者都不传时气泡是空的。
- 气泡方位用 `placement`（不是 `position`）；`width`、`padding`、`borderRadius`、`color`、`gap` 这些参数在源码里并不存在，尺寸与内边距请用 `overlayStyle` / `style` 传。
