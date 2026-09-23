# Drawer 抽屉
从屏幕某一侧滑出的面板，用来承载表单、详情、筛选条件等次级内容。

## 基础用法
`children` 传函数时可以拿到一个「带离场动画的关闭函数」，用它关闭抽屉会先播完动画再移除。

```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer drawerClose={() => setOpenDrawer(false)}>
          {close => (
            <div style={{ padding: 16 }}>
              <h3>抽屉标题</h3>
              <p>抽屉内容</p>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 控制抽屉出现的位置
`placement` 可选 `left`、`right`、`top`、`bottom`，默认从右侧滑出。

```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'
import type { DrawerPlacement } from 'ono-react-element'

const placementList: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']

function App() {
  const [placement, setPlacement] = useState<DrawerPlacement | null>(null)

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {placementList.map(item => (
        <Button key={item} onClick={() => setPlacement(item)}>
          {item}
        </Button>
      ))}
      {placement && (
        <Drawer
          placement={placement}
          drawerClose={() => setPlacement(null)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>placement: {placement}</h3>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 自定义面板尺寸
`size` 传数字时按 px 处理，传字符串则原样使用（`px`、`%`、`rem` 都可以）。左右侧抽屉的 `size` 是宽度，上下侧抽屉的 `size` 是高度，不传时用默认的 `378px`。

```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer
          placement="left"
          size="60%"
          drawerClose={() => setOpenDrawer(false)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>宽度 60%</h3>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 自定义动画时长
`duration` 同时作用于遮罩的淡入淡出和面板的进出场动画，默认 `300`。

```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer
          duration={500}
          drawerClose={() => setOpenDrawer(false)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>动画时长 500ms</h3>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 点击遮罩不关闭
`maskClickClose` 默认为 `false`，即点击遮罩不会关闭抽屉，需要显式打开。

```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer
          placement="bottom"
          maskClickClose
          drawerClose={() => setOpenDrawer(false)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>点击遮罩可以关闭</h3>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 自定义遮罩颜色
```tsx
import { useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer
          maskColor="rgba(86, 68, 184, 0.35)"
          drawerClose={() => setOpenDrawer(false)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>自定义遮罩色</h3>
              <Button onClick={close}>关闭</Button>
            </div>
          )}
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 结合PortalRenderer用法
用 `portalRenderer` 把抽屉挂到 `body` 上，可以避开父级的 `overflow` 与层叠上下文；此时 `destroy` 就充当 `drawerClose`。

```tsx
import { Button, Drawer, portalRenderer } from 'ono-react-element'
import type { DrawerPlacement } from 'ono-react-element'

const DrawerElement = ({
  placement,
  destroy
}: {
  placement: DrawerPlacement
  destroy: () => void
}) => (
  <Drawer placement={placement} size={320} drawerClose={destroy}>
    {close => (
      <div style={{ padding: 16 }}>
        <h3>placement: {placement}</h3>
        <Button onClick={close}>关闭</Button>
      </div>
    )}
  </Drawer>
)

function App() {
  return (
    <Button
      onClick={() =>
        portalRenderer(DrawerElement, { placement: 'right' }, 'drawer-demo')
      }
    >
      打开抽屉
    </Button>
  )
}

export default App;
```

## API
通用属性参考：通用属性

除 `children`、`className`、`style`、`placement`、`size`、`duration`、`maskColor`、`maskClickClose`、`disableContextMenu`、`drawerClose` 外的其余 div 原生属性（如 `onMouseEnter`、`data-*` 等）会透传到抽屉面板上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|抽屉内容，传函数时可拿到「带离场动画的关闭函数」|<code>ReactNode</code>\|<code>(drawerClose: () => void) => ReactNode</code>|-|是
placement|从屏幕哪一侧滑出|<code>DrawerPlacement</code>|<code>'right'</code>|否
size|面板尺寸，左右侧为宽度、上下侧为高度，数字按 px 处理|<code>number</code>\|<code>string</code>|<code>378</code>|否
duration|进出场动画时长（ms），传 <code>0</code> 或负数时无动画|<code>number</code>|<code>300</code>|否
maskColor|遮罩颜色|<code>string</code>|<code>'rgba(0, 0, 0, 0.5)'</code>|否
maskClickClose|点击遮罩是否关闭|<code>boolean</code>|<code>false</code>|否
disableContextMenu|是否禁用遮罩上的右键菜单|<code>boolean</code>|<code>false</code>|否
drawerClose|请求关闭，由使用方在回调里移除组件（组件会先播完离场动画）|<code>() => void</code>|-|是
className|自定义类名，作用在抽屉面板上|<code>string</code>|-|否
style|自定义样式，作用在抽屉面板上|<code>CSSProperties</code>|-|否
onClick|点击面板的点击事件，不会触发遮罩的点击|<code>(e: React.MouseEvent\<HTMLDivElement>) => void</code>|-|否

### DrawerPlacement
类型|说明
:- | :- 
<code>'left'</code>|从左侧滑出
<code>'right'</code>|从右侧滑出
<code>'top'</code>|从顶部滑出
<code>'bottom'</code>|从底部滑出

## 注意事项
- `maskClickClose` 默认为 `false`（与 TemplateDialog 的默认值相反），点击遮罩默认不关闭抽屉，需要显式传入。
- `className` / `style` 作用在抽屉面板上，不是遮罩。面板尺寸请优先用 `size` 指定；如果 `style` 里同时写了 `width` / `height`，行内样式会盖过 `size`。
- `duration` 为 `0` 或负数时没有离场动画，`drawerClose` 会立即执行；拿不到面板节点时同理。
- 重复触发关闭（动画期间连点遮罩或关闭按钮）只会执行一次，组件内部做了防重入。
- 遮罩是 `position: fixed` + `z-index: 9999`，不受父级 `overflow` 影响；但若祖先元素带 `transform`、`filter` 等属性，仍会改变它的定位基准，这种情况建议配合 `portalRenderer` 使用。
- 离场动画的终态是 `translate: none` 而不是 `translate: 0`，这样面板不会成为 `transform` 包含块，面板里使用 `position: fixed` 的元素在动画结束后仍按视口定位。
- 面板上的点击不会触发遮罩的关闭，你在面板上传的 `onClick` 会正常收到事件（组件内部已阻断冒泡）。
