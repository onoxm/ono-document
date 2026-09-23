# Modal 弹窗
展示一个模态对话框，提供标题、内容区与操作区，通过命令式调用打开。

## 基础用法
调用 `Modal(options)` 即可打开弹窗，弹窗会被挂载到 `body` 下。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '弹窗内容',
      okText: '确定',
      cancelText: '取消',
      onConfirm: () => {
        console.log('确定')
      },
      onCancel: () => {
        console.log('取消')
      }
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 点击蒙层关闭弹窗
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '点击蒙层可以关闭',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 自定义底部内容
`footer` 是一个渲染函数，入参里有 `OkBtn`、`CancelBtn` 两个按钮组件和 `handleClose`。

只需要确认键，不需要取消键，可以这样写：
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      footer: ({ OkBtn }) => <OkBtn />
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

只需要取消键，不需要确认键，可以这样写：
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      footer: ({ CancelBtn }) => <CancelBtn />
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

如果不满意默认的按钮样式，可以自己渲染按钮，并调用 `handleClose` 关闭弹窗：
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      footer: ({ handleClose }) => (
        <>
          <button
            onClick={() => {
              console.log('取消')
              handleClose()
            }}
          >
            取消
          </button>
          <button
            onClick={() => {
              console.log('确定')
              handleClose()
            }}
          >
            确定
          </button>
        </>
      )
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

若不需要底部按钮，把 `footer` 传成 `null` 即可：
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({ footer: null, maskClosable: true })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 自定义弹窗内容
`modalBody` 会替换掉默认的标题、内容与底部，所有结构由自己决定，入参是关闭弹窗的方法。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      modalBody: handleClose => (
        <div
          style={{
            width: 416,
            padding: 20,
            background: '#f0f2f5',
            borderRadius: 8
          }}
        >
          <h1>自定义弹窗标题</h1>
          <p style={{ marginTop: 16 }}>自定义弹窗内容</p>
          <button
            style={{ float: 'right', marginTop: 64, padding: '4px 16px' }}
            onClick={handleClose}
          >
            关闭弹窗
          </button>
        </div>
      )
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 指定弹窗出现和消失位置
`startPosition` 是**视口坐标**，传入后弹窗会从该点缩放展开，关闭时再缩回该点。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    Modal({
      title: '弹窗标题',
      content: '弹窗内容',
      okText: '确定',
      cancelText: '取消',
      startPosition: { x: centerX, y: centerY }
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 使用 Promise 延时关闭
`onConfirm` 返回 Promise 时，确定按钮进入加载状态且期间无法重复点击，Promise 结束后才关闭弹窗。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '确定后等待 3 秒才关闭',
      okText: '确定',
      cancelText: '取消',
      onConfirm: () => new Promise(res => setTimeout(res, 3000))
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 自定义按钮颜色
`btnClr` 会作为按钮主题色，组件会基于它自动派生出悬停、按下与禁用状态的颜色。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '按钮主题色已改为绿色',
      btnClr: '#52c41a'
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 自定义宽度
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '这是一个更宽的弹窗',
      width: 600
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 禁用按钮
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '确定按钮处于禁用状态',
      confirmDisabled: true,
      cancelDisabled: true
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 手动关闭弹窗
`Modal()` 的返回值是一个 `destroy` 函数，可以在别处主动关闭弹窗。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    const destroy = Modal({
      title: '弹窗标题',
      content: '3 秒后自动关闭'
    })

    setTimeout(() => destroy(), 3000)
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
title|弹窗标题|<code>ReactNode</code>|<code>'This is a modal title'</code>|否
content|弹窗内容|<code>ReactNode</code>|<code>'This is a modal content'</code>|否
icon|弹窗图标，不传时显示内置的警告图标|<code>ReactNode</code>|-|否
okText|确定按钮文字|<code>string</code>|<code>'confirm'</code>|否
cancelText|取消按钮文字|<code>string</code>|<code>'cancel'</code>|否
startPosition|弹窗出现与消失的起始位置，取值是视口坐标|<code>{ x: number; y: number }</code>|-|否
confirmDisabled|是否禁用确定按钮|<code>boolean</code>|<code>false</code>|否
cancelDisabled|是否禁用取消按钮|<code>boolean</code>|<code>false</code>|否
onConfirm|确定按钮回调，返回 Promise 时按钮进入加载状态|<code>() => void \| Promise\<void></code>|-|否
onCancel|取消按钮回调|<code>() => void \| Promise\<void></code>|-|否
mask|是否显示蒙层|<code>boolean</code>|<code>true</code>|否
maskClosable|点击蒙层是否可关闭弹窗|<code>boolean</code>|<code>false</code>|否
width|弹窗宽度，传数字即可|<code>string</code>\|<code>number</code>|<code>416</code>|否
btnClr|按钮主题色|<code>string</code>|<code>#5644b8</code>|否
footer|自定义底部内容，传 <code>null</code> 时不渲染底部|<code>(params: footerRenderParams) => ReactNode</code>\|<code>null</code>|<code>({ OkBtn, CancelBtn }) => ReactNode</code>|否
modalBody|自定义弹窗内容，会替换默认的标题、内容与底部|<code>(handleClose: () => void) => ReactNode</code>|<code>null</code>|否

### footerRenderParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
OkBtn|确定按钮组件|<code>FC</code>|-|否
CancelBtn|取消按钮组件|<code>FC</code>|-|否
handleClose|关闭弹窗并播放离场动画|<code>() => void</code>|-|否

## 注意事项
- `width` 虽然声明为 `string | number`，但实现里是直接拼 `px` 的，**只传数字**：传 `'600px'` 会变成 `600pxpx` 而不生效。
- `title`、`content`、`okText`、`cancelText` 都有英文默认文案，**不传就会显示 `This is a modal title` 这类占位内容**。
- 不传 `startPosition` 时弹窗**没有进出场动画**，点确定/取消会立即销毁；传了 `startPosition` 才会有从该点缩放展开、再缩回该点的动画（时长 0.3 秒），关闭也因此会延后 0.3 秒执行。
- `startPosition` 的 `x` / `y` 是**相对视口的像素坐标**，组件内部会换算成百分比，常见写法是取触发按钮的 `getBoundingClientRect()` 中心点。
- `footer` 的默认值会渲染成「取消在左、确定在右」，`OkBtn` / `CancelBtn` 只能用在 `footer` 的渲染函数里。
- 使用 `modalBody` 时默认的头部、内容与底部都不再渲染，**此时弹窗内容没有做点击阻断**：如果同时开了 `maskClosable`，点在内容上会冒泡到外层被当成「点了蒙层」而关闭，需要自己在内容的根节点上 `stopPropagation`。
- `onConfirm` 返回 Promise 期间，确定按钮进入加载状态、取消按钮同时被禁用，两者都无法再次点击；Promise 结束后弹窗自动关闭。
- `mask` 为 `false` 时不显示蒙层，此时页面滚动不会被锁定；`mask` 为 `true` 时使用原生 `dialog` 的模态模式，页面不可滚动。
- `Modal()` 的返回值是 `destroy` 方法，可用于在外部主动关闭弹窗；连续调用 `Modal()` 会打开多个互相独立的弹窗。
