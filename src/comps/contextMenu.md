# ContextMenu 右键菜单
在鼠标位置弹出菜单的命令式 API，用来替换浏览器默认的右键菜单。

## 基础用法
在元素的 `onContextMenu` 里把事件交给 `contextMenu`：

```tsx
import { contextMenu } from 'ono-react-element'

function App() {
  return (
    <div
      onContextMenu={e =>
        contextMenu({
          e,
          content: (
            <ul
              style={{
                margin: 0,
                padding: '4px 0',
                minWidth: 120,
                listStyle: 'none',
                background: '#fff',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            >
              <li style={{ padding: '6px 12px' }}>复制</li>
              <li style={{ padding: '6px 12px' }}>粘贴</li>
              <li style={{ padding: '6px 12px' }}>删除</li>
            </ul>
          )
        })
      }
      style={{ height: 160, background: '#f5f5f5', border: '1px dashed #999' }}
    >
      在这里点右键
    </div>
  )
}

export default App;
```

## 菜单项里主动关闭
`content` 传函数时会拿到 `onClose`，调用它即可关掉菜单：

```tsx
import { contextMenu } from 'ono-react-element'

function App() {
  return (
    <div
      onContextMenu={e =>
        contextMenu({
          e,
          content: onClose => <button onClick={() => onClose()}>点我关闭菜单</button>
        })
      }
      style={{ height: 160, background: '#f5f5f5' }}
    >
      右键试试
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
e|右键事件对象，用来取坐标并拦掉原生菜单|<code>React.MouseEvent&lt;HTMLElement, MouseEvent&gt;</code>|-|是
content|菜单内容，传函数时可拿到 <code>onClose</code>|<code>ReactNode</code>\|<code>(onClose: () =&gt; void) =&gt; ReactNode</code>|-|是
className|菜单容器的类名|<code>string</code>|-|否
style|菜单容器的行内样式|<code>CSSProperties</code>|-|否
getPopupContainer|菜单落点解析器，不传则走内置解析链|<code>PopupContainerResolver</code>|-|否

## 注意事项
- 函数内部**第一件事就是 `e.preventDefault()`**，浏览器原生右键菜单一定会被拦掉 —— 不适合弹自定义菜单的场景不要调用它。
- 菜单挂载后在 window 上监听 `click`，**点击页面任意位置都会关闭**；菜单内部的点击也会关闭，需要「点了不关」的交互请自己 `stopPropagation`。
- 菜单是 `position: fixed` 定位，并做了视口边界收敛：右侧 / 下方空间不足时会贴边显示，不会跑出屏幕。
- 触发元素在 Modal / Drawer 里时，落点会自动改为该弹窗容器内部（否则会被 top layer / 遮罩盖住）；需要固定挂在别处就用 `getPopupContainer`。
- 菜单容器带 `ono-context-menu` 类，层级由 CSS 变量 `--ono-z-popup` 驱动（回退 `999`）。想单独覆盖可以在 `style` 里写 `zIndex`，行内值会压过变量。
- 菜单没有内置的选中项、子菜单与键盘导航，这些都要自己实现。
