# Popconfirm 气泡确认框
点击触发元素后弹出一个气泡，让用户在「确定 / 取消」之间做二次确认。

## 基础用法
点击触发元素展开气泡，确定与取消都会关闭气泡并触发各自的回调。

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

## 异步确定
`onConfirm` 返回 Promise 时，确定按钮会转成 loading 并禁止重复点击，等 Promise resolve 之后气泡才关闭。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要提交吗？"
      content="提交中确定按钮会转 loading，完成后气泡才关闭"
      onConfirm={async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }}
    >
      <Button>提交</Button>
    </Popconfirm>
  )
}

export default App;
```

## 异步确定失败时保留气泡
Promise 被拒绝时组件不会关闭气泡，确定按钮的 loading 也会收掉，用户可以在原地重试。

```tsx
import { Button, Popconfirm, message } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要提交吗？"
      content="提交失败时气泡保持打开，可以重试"
      onConfirm={async () => {
        try {
          await new Promise((_resolve, reject) =>
            setTimeout(() => reject(new Error('提交失败')), 1500)
          )
        } catch (err) {
          message.error('提交失败，请重试')
          // 想让气泡留在原地，必须重新抛出；只 catch 不抛，await 会当成成功、气泡照样关闭
          throw err
        }
      }}
    >
      <Button>提交</Button>
    </Popconfirm>
  )
}

export default App;
```

## 自定义按钮文字
`okText` / `cancelText` 改按钮文案，`content` 在标题下方补一段说明。

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
`btnBarDom` 的入参是 `{ OkBtn, CancelBtn, handleClose }`，其中 `OkBtn` / `CancelBtn` 都是已经接好默认行为的组件（用 `<OkBtn />` 渲染），`handleClose` 只负责关闭。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      btnBarDom={({ OkBtn, CancelBtn, handleClose }) => (
        <>
          <button onClick={handleClose}>关闭</button>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## 透传按钮属性
`OkBtn` / `CancelBtn` 就是普通的 `Button`，可以照常传 `ButtonProps`。传了 `onClick` 会替换掉默认逻辑，需要的话在回调里自己调 `handleClose`。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      btnBarDom={({ OkBtn, CancelBtn, handleClose }) => (
        <>
          <CancelBtn size="small" />
          <OkBtn
            type="danger"
            size="small"
            onClick={() => {
              console.log('走自己的确认逻辑')
              handleClose()
            }}
          />
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
非受控时用 `defaultOpen` 指定初始展开状态。

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
传入 `open` 后展开状态完全由外部决定，`onOpenChange` 用来接收想要变更的状态。

```tsx
import { useState } from 'react'
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Button onClick={() => setOpen(!open)}>切换</Button>
      <Popconfirm title="这是一段内容" open={open} onOpenChange={setOpen}>
        <Button>受控的确认框</Button>
      </Popconfirm>
    </div>
  )
}

export default App;
```

## 自定义方位
`placement` 的取值与 Popper 一致，完整列表见文末的 `PlacementType`。

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

## 隐藏箭头与自定义样式
`isShowArrow` 关掉箭头；`overlayStyle` / `overlayClassName` 作用于内层内容容器，`style` / `className` 作用于整个浮层。

```tsx
import { Button, Popconfirm } from 'ono-react-element'

function App() {
  return (
    <Popconfirm
      title="确定要删除这条记录吗？"
      isShowArrow={false}
      placement="bottom-start"
      overlayStyle={{ width: 260 }}
      style={{ maxWidth: 'none' }}
    >
      <Button>Click</Button>
    </Popconfirm>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|触发元素，单个 React 元素时会被注入 ref 用于定位|<code>ReactNode</code>|-|是
title|气泡标题，也是主要文案（标题容器始终渲染）|<code>ReactNode</code>|-|否
content|气泡内容，作为标题下方的补充说明|<code>ReactNode</code>|-|否
okText|确定按钮文字|<code>string</code>|<code>'确定'</code>|否
cancelText|取消按钮文字|<code>string</code>|<code>'取消'</code>|否
onConfirm|点击确定后触发；返回 Promise 时确定按钮转 loading，等它落定才关闭，被拒绝则不关闭|<code>() =&gt; void \| Promise&lt;unknown&gt;</code>|<code>() =&gt; {}</code>|否
onCancel|点击取消后触发（先关闭浮层，再执行它）|<code>() =&gt; void</code>|<code>() =&gt; {}</code>|否
btnBarDom|自定义按钮组，入参为 <code>{ OkBtn, CancelBtn, handleClose }</code>|<code>(params) =&gt; ReactElement</code>|取消 + 确定两个按钮|否
trigger|触发方式。组件内部固定传 <code>'click'</code>，经 restProps 展开后可以覆盖|<code>'hover'</code>\|<code>'click'</code>\|<code>'focus'</code>\|<code>'contextmenu'</code>|<code>'click'</code>|否
placement|气泡相对触发元素的方位|<code>PlacementType</code>|<code>'top'</code>|否
isShowArrow|是否显示箭头|<code>boolean</code>|<code>true</code>|否
disabled|禁用后只渲染触发元素，不再弹出气泡|<code>boolean</code>|<code>false</code>|否
defaultOpen|是否默认展开（非受控）|<code>boolean</code>|<code>false</code>|否
open|受控的展开状态|<code>boolean</code>|-|否
onOpenChange|展开状态变化回调|<code>(open: boolean) =&gt; void</code>|<code>() =&gt; {}</code>|否
overlayClassName|内层内容容器的类名|<code>string</code>|-|否
overlayStyle|内层内容容器的样式|<code>CSSProperties</code>|-|否
className|浮层类名|<code>string</code>|-|否
style|浮层样式|<code>CSSProperties</code>|-|否
borderColor|浮层边框与箭头颜色，组件内部固定传 <code>'transparent'</code>|<code>string</code>|<code>'transparent'</code>|否
sameWidth|浮层宽度是否跟随触发元素|<code>boolean</code>|<code>false</code>|否
autoAdjustOverflow|空间不足时自动翻转方位|<code>boolean</code>|<code>true</code>|否
arrowPointAtCenter|箭头是否指向触发元素的中心|<code>boolean</code>|<code>false</code>|否
mouseDelay|<code>hover</code> 触发的延迟（ms），可分别设置进入与离开|<code>number</code>\|<code>{ enter: number; leave: number }</code>|<code>200</code>|否
zIndex|浮层层级|<code>number</code>|<code>999</code>|否
popperOptions|透传给 <code>@popperjs/core</code> 的配置|<code>Partial&lt;Options&gt;</code>|<code>{}</code>|否

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
- 两个按钮的关闭时机不一样：**取消**是先关闭浮层、再调 `onCancel`；**确定**是先调 `onConfirm`，同步返回时紧跟着关闭，异步则等 Promise 落定。无论走哪条路，只要关闭就会额外触发一次 `onOpenChange(false)`。
- 浮层通过 Portal 挂到 `document.body`，不受父级 `overflow` 裁剪，也不在触发元素的子树里。组件把**触发元素和浮层本身**都算作「内部」，所以点击气泡里的空白处不会关闭它 —— 异步确定的 loading 能显示出来，靠的正是这一条。
- 「外部」的判定同时监听 `click` 与 `contextmenu`，并且只在 `trigger` 为 `click` / `contextmenu` 时才关闭。因此在 Popconfirm 下**在浮层和触发元素之外点右键也会关闭**；反过来，在触发元素上点右键本身不会打开气泡（那需要显式设成 `trigger="contextmenu"`）。
- 异步确定进行中**取消按钮仍然可用**：点它会立刻关闭浮层，但并不会取消那个 Promise；等 Promise 落定后还会再走一次关闭。
- 异步确定被拒绝时，组件既不关浮层、也不替你吞掉错误 —— 拒绝会继续往外抛，控制台会看到 `Uncaught (in promise)`。要提示用户就在 `onConfirm` 里自己 `try/catch`（本包构建开了 dropConsole，组件内部不会打任何日志）。⚠️ 想「失败就留在原地重试」，`catch` 里必须 `throw` 重新抛出。
- `disabled` 为真时组件直接返回 `children`，不渲染任何浮层结构。
- `children` 建议传单个 React 元素（会 `cloneElement` 注入定位用的 ref）；传纯文本等非元素内容时会自动包一层 `div`。
- `OkBtn` / `CancelBtn` 是已经接好默认行为的 `Button`，可以正常透传 `ButtonProps`（`type`、`size`、`style` 等）；但传 `onClick` 会**替换**掉默认的确定 / 取消逻辑，传 `loading` 会覆盖内部按异步状态算出来的值。`CancelBtn` 自带一组内联样式（透明底、<code>1px solid #666</code> 描边、灰字），你传的 `style` 会合并在其后。
- `title` 与 `content` 都可选，但标题容器始终渲染，两个都不传时气泡里只剩按钮组。
- 浮层外层带 <code>max-width: 300px</code>（来自基础浮层样式）与 <code>min-width: 200px</code>（Popconfirm 自身）。只把 `overlayStyle` 的宽度调到 300 以上时，内层会撑出外层、而外层仍按 300px 计算定位，气泡会偏离触发元素；要更宽请同时给 `style` 传 <code>maxWidth: 'none'</code>。
- 气泡方位用 `placement`（不是 `position`）；`width`、`padding`、`borderRadius`、`color`、`gap` 这些参数在源码里并不存在，尺寸与内边距请走 `overlayStyle` / `style`。
