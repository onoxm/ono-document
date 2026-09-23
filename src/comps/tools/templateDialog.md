# TemplateDialog 模版对话框
只提供遮罩、进出场动画和关闭流程的对话框外壳，标题、内容与按钮全部由使用方自己编写。

## 基础用法
`children` 传函数时可以拿到一个「带离场动画的关闭函数」，用它关闭对话框会先播完动画再移除。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          style={{
            width: 500,
            height: 300,
            background: 'white',
            border: '1px solid #333',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => (
            <>
              <h1>This is my dialog</h1>
              <Button
                style={{ position: 'absolute', right: 16, bottom: 16 }}
                onClick={close}
              >
                Close
              </Button>
            </>
          )}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 结合PortalRenderer用法
用 `portalRenderer` 把对话框挂到 `body` 上，可以避开父级的 `overflow` 与层叠上下文；此时 `destroy` 就充当 `dialogClose`。

```tsx
import { Button, portalRenderer, TemplateDialog } from 'ono-react-element'

const MyDialog = ({ destroy }: { destroy: () => void }) => {
  return (
    <TemplateDialog
      dialogClose={destroy}
      style={{
        width: 500,
        height: 300,
        background: 'white',
        border: '1px solid #333',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {close => (
        <>
          <h1>This is my dialog</h1>
          <Button
            style={{ position: 'absolute', right: 16, bottom: 16 }}
            onClick={close}
          >
            Close
          </Button>
        </>
      )}
    </TemplateDialog>
  )
}

function App() {
  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => portalRenderer(MyDialog, {}, 'my-dialog')}>
        Open My Dialog
      </Button>
    </div>
  )
}

export default App;
```

## 从触发元素处放大展开
`animation` 传 `zoom` 时需要同时传 `element`，对话框会从该元素的中心放大展开，通常直接把触发按钮的 `e.currentTarget` 传进去。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)
  const [trigger, setTrigger] = useState<HTMLElement | null>(null)

  return (
    <div style={{ width: '500px' }}>
      <Button
        onClick={e => {
          setTrigger(e.currentTarget)
          setOpenDialog(true)
        }}
      >
        打开弹出
      </Button>
      {openDialog && trigger && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          animation={{ type: 'zoom', element: trigger }}
          style={{
            width: 300,
            height: 160,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 从指定位置淡入
`animation` 传 `fade` 时需要同时传 `startPosition`：它是起点在垂直方向的位置（相对遮罩高度的 CSS 长度），小于 `50%` 从上方滑入、大于 `50%` 从下方滑入，水平方向始终居中。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          animation={{ type: 'fade', startPosition: '20%' }}
          style={{
            width: 300,
            height: 200,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 自定义动画时长
`duration` 同时作用于遮罩的淡入淡出与对话框的进出场动画，默认 `300`。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          duration={800}
          animation={{ type: 'fade', startPosition: '20%' }}
          style={{
            width: 300,
            height: 200,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 点击遮罩不关闭
`maskClickClose` 默认为 `true`，需要防止误关时显式传 `false`。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          maskClickClose={false}
          style={{
            width: 300,
            height: 200,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 自定义遮罩颜色
```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          maskColor="rgba(86, 68, 184, 0.35)"
          style={{
            width: 300,
            height: 200,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## 禁用右键菜单
传 `disableContextMenu` 后，在遮罩上右键不会弹出浏览器菜单。

```tsx
import { useState } from 'react'
import { Button, TemplateDialog } from 'ono-react-element'

function App() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDialog(true)}>打开弹出</Button>
      {openDialog && (
        <TemplateDialog
          dialogClose={() => setOpenDialog(false)}
          disableContextMenu
          style={{
            width: 300,
            height: 200,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {close => <Button onClick={close}>关闭</Button>}
        </TemplateDialog>
      )}
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性

`children` 与 `animation` 之外的 div 原生属性虽然写在类型里（`ComponentPropsType<'div'>`），但组件并不透传，除 `className`、`style` 外传入的其他属性（如 `onMouseEnter`）不会生效。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|对话框内容，传函数时可拿到「带离场动画的关闭函数」|<code>ReactNode</code>\|<code>(enhancedDialogClose: () => void) => ReactNode</code>|-|是
animation|进出场动画，不传则没有动画|<code>{ type: 'zoom'; element: HTMLElement }</code>\|<code>{ type: 'fade'; startPosition: string }</code>|-|否
duration|动画时长（ms），同时作用于遮罩与对话框|<code>number</code>|<code>300</code>|否
maskColor|遮罩颜色|<code>string</code>|<code>'rgba(0, 0, 0, 0.5)'</code>|否
maskClickClose|点击遮罩是否关闭|<code>boolean</code>|<code>true</code>|否
disableContextMenu|是否禁用遮罩上的右键菜单|<code>boolean</code>|<code>false</code>|否
dialogClose|请求关闭，由使用方在回调里移除组件|<code>() => void</code>|-|是
className|自定义类名，作用在对话框本体上|<code>string</code>|-|否
style|自定义样式，作用在对话框本体上|<code>CSSProperties</code>|-|否

### animation
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
type|动画类型|<code>'zoom'</code>\|<code>'fade'</code>|-|是
element|<code>zoom</code> 的起点元素，对话框从该元素中心放大展开|<code>HTMLElement</code>|-|<code>zoom</code> 时必填
startPosition|<code>fade</code> 的起点位置（相对遮罩高度的 CSS 长度）|<code>string</code>|-|<code>fade</code> 时必填

## 注意事项
- `dialogClose` 与 `children` 函数里的 `close` 不是同一个：`dialogClose` 是你传进来的「真正移除组件」的回调，直接调它没有离场动画；函数参数里的 `close` 会先挂上离场动画、等 `duration` 后再调 `dialogClose`，点击遮罩走的也是这个版本。因此关闭按钮建议用函数参数里的 `close`。
- 不传 `animation` 时没有动画：关闭会立即调用 `dialogClose`，遮罩也不会淡入淡出（遮罩动画的时长变量 `--duration` 只在传入 `animation` 时才会被组件写入）。
- 不要把 `position` 写进 `style`：居中由组件自身的 `position: absolute` + `top/left: 50%` + `translate: -50% -50%` 完成（配合遮罩的 flex 居中），在 `style` 里写 `position: 'relative'` 会把对话框推到视口右下角。对话框本体已经是定位元素，内部需要绝对定位的元素可以直接相对它定位。
- 遮罩是 `position: fixed` + `z-index: 9999`，不受父级 `overflow` 影响；但若祖先元素带 `transform`、`filter` 等属性，仍然会改变它的定位基准，这种情况建议配合 `portalRenderer` 使用。
- 遮罩上的点击会关闭对话框，但点击对话框本体不会（组件内部已 `stopPropagation`）；`disableContextMenu` 也只作用于遮罩的右键菜单，对话框内部不受影响。
