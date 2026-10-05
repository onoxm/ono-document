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

## 禁用点击遮罩关闭
`maskClickClose` 默认为 `true`，即点击遮罩会关闭抽屉；传 `false` 可以禁用它。

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
          maskClickClose={false}
          drawerClose={() => setOpenDrawer(false)}
        >
          {close => (
            <div style={{ padding: 16 }}>
              <h3>点击遮罩不会关闭</h3>
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

## 头部与底部槽位
只传 `title` 时组件会用内置头部把标题包起来，并默认渲染一个关闭按钮（`closable` 默认 `true`，图标可用 `closeIcon` 替换）。想完全接管头部或底部，改用 `header` / `footer` 函数槽位——函数会拿到 `drawerClose` 与一个已经带好该槽位默认类名的 `Container` 组件。

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
          title="内置头部"
          footer={close => (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button onClick={close}>取消</Button>
              <Button type="success" onClick={close}>
                确定
              </Button>
            </div>
          )}
          drawerClose={() => setOpenDrawer(false)}
        >
          <div style={{ padding: 16 }}>抽屉内容</div>
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

## 自定义浮层落点
抽屉默认**原地渲染**。当祖先元素带 `transform` / `filter` / `z-index` 时，`position: fixed` 的遮罩会被关进那个层叠上下文、甚至被裁掉，这时用 `getContainer` 把抽屉挂到更外层的容器上。

```tsx
import { useRef, useState } from 'react'
import { Button, Drawer } from 'ono-react-element'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={hostRef} style={{ position: 'relative' }}>
      <Button onClick={() => setOpenDrawer(true)}>打开抽屉</Button>
      {openDrawer && (
        <Drawer
          getContainer={() => hostRef.current}
          drawerClose={() => setOpenDrawer(false)}
        >
          <div style={{ padding: 16 }}>抽屉内容</div>
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性

除 `children`、`title` 外的其余 div 原生属性（如 `className`、`style`、`onClick`、`onMouseEnter`、`data-*` 等）会透传到抽屉面板上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|抽屉主体内容，节点会被包进 <code>.ono-drawer-body</code>|<code>DrawerSlot</code>|-|是
title|头部标题文字，只传它时用内置头部包住并追加关闭按钮|<code>ReactNode</code>|-|否
header|完全接管整个头部区域|<code>DrawerSlot</code>|-|否
closable|内置头部里是否渲染关闭按钮|<code>boolean</code>|<code>true</code>|否
closeIcon|关闭按钮的图标，传了则整个替换内置的 X|<code>ReactNode</code>|-|否
footer|完全接管整个底部区域|<code>DrawerSlot</code>|-|否
placement|从屏幕哪一侧滑出|<code>DrawerPlacement</code>|<code>'right'</code>|否
size|面板尺寸，左右侧为宽度、上下侧为高度，数字按 px 处理|<code>number</code>\|<code>string</code>|<code>378</code>|否
duration|进出场动画时长（ms），传 <code>0</code> 或负数时无动画|<code>number</code>|<code>300</code>|否
maskColor|遮罩颜色|<code>string</code>|<code>'rgba(0, 0, 0, 0.5)'</code>|否
maskClickClose|点击遮罩是否关闭|<code>boolean</code>|<code>true</code>|否
escClose|按下 Esc 是否关闭抽屉|<code>boolean</code>|<code>true</code>|否
disableContextMenu|是否禁用遮罩上的右键菜单|<code>boolean</code>|<code>false</code>|否
getContainer|浮层落点解析器，不传则原地渲染|<code>PopupContainerResolver</code>|-|否
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

### DrawerSlot
类型值|说明
:- | :- 
<code>ReactNode</code>|直接给节点，由 Drawer 用该槽位默认的 <code>Container</code> 包一层
<code>(drawerClose, Container) =&gt; ReactNode</code>|给函数时拿到关闭回调与已带默认类名的 <code>Container</code> 组件，可追加或覆盖任意 div 属性，也可以不用它自己渲染别的元素

## 注意事项
- `maskClickClose` 与 `escClose` 都默认为 `true`：点击遮罩、按 Esc 都会关闭抽屉。Esc 与「点遮罩」同语义，直接走 `drawerClose`，不会触发面板上的 `onClick`。
- 多层抽屉叠加时，按一次 Esc 只会关掉最上面的那一层（内部按 DOM 嵌套关系 + 打开顺序判定）。
- `className` / `style` 作用在抽屉面板上，不是遮罩。面板尺寸请优先用 `size` 指定；如果 `style` 里同时写了 `width` / `height`，行内样式会盖过 `size`。
- `duration` 为 `0` 或负数时没有离场动画，`drawerClose` 会立即执行；拿不到面板节点时同理。
- 重复触发关闭（动画期间连点遮罩或关闭按钮）只会执行一次，组件内部做了防重入。
- 遮罩是 `position: fixed` + `z-index: var(--ono-z-modal, 1999)`，不受父级 `overflow` 影响；但若祖先元素带 `transform`、`filter` 等属性，仍会改变它的定位基准，这种情况用 `getContainer` 指定一个更外层的容器即可。
- 离场动画的终态是 `translate: none` 而不是 `translate: 0`，这样面板不会成为 `transform` 包含块，面板里使用 `position: fixed` 的元素在动画结束后仍按视口定位。
- 面板上的点击不会触发遮罩的关闭，你在面板上传的 `onClick` 会正常收到事件（组件内部已阻断冒泡）。
