# Modal 弹窗
展示一个模态对话框，提供标题、内容区与操作区，通过命令式调用打开。

## 基础用法
调用 `Modal(options)` 即可打开弹窗。弹窗挂在 `<div id="ono-modal">` 容器里（首次调用时创建、全部关闭后移除），每次调用都是一个独立实例。

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
`maskClosable` 默认为 `false`，需要显式打开。
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

## 自定义按钮文字与样式
`OkBtn` / `CancelBtn` 接受 `onClick`、`children`、`className`、`style` 四个属性：`children` 覆盖 `okText` / `cancelText`，`className` 追加在内置类名之后。

```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      footer: ({ OkBtn, CancelBtn }) => (
        <>
          <CancelBtn style={{ borderColor: '#999' }}>再想想</CancelBtn>
          <OkBtn className="my-ok-btn">删除</OkBtn>
        </>
      )
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

传入 `onClick` 会**替换**掉默认的确定 / 取消逻辑，这时弹窗不会自己关闭，需要在回调里调用 `handleClose`。

```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      footer: ({ OkBtn, handleClose }) => (
        <OkBtn
          onClick={() => {
            console.log('自定义确认逻辑')
            handleClose()
          }}
        >
          确定并关闭
        </OkBtn>
      )
    })
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
`startPosition` 是**视口坐标**，传入后弹窗会从该点缩放展开，关闭时再缩回该点。取触发元素的中心点可以直接用导出的 `getElementCenterPosition`。
```tsx
import { Button, getElementCenterPosition, Modal } from 'ono-react-element'

function App() {
  const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { x, y } = getElementCenterPosition(e.currentTarget)

    Modal({
      title: '弹窗标题',
      content: '弹窗会从这个按钮的位置展开',
      startPosition: { x, y }
    })
  }

  return <Button onClick={handleModal}>打开弹窗</Button>
}

export default App;
```

## 使用 Promise 延时关闭
`onConfirm` 返回 Promise 时，弹窗会等它落定再关闭，关闭时同样会播 `startPosition` 的离场动画。注意等待期间按钮**不会有任何加载反馈**（原因见「注意事项」）。
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
`width` 传数字时按 px 处理，传字符串则原样使用，所以百分数之类的写法也可以。
```tsx
import { Button, Modal } from 'ono-react-element'

function App() {
  const handleModal = () => {
    Modal({
      title: '弹窗标题',
      content: '这是一个更宽的弹窗',
      width: '80%'
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
icon|弹窗图标，传了会整块替换掉内置的图标容器|<code>ReactNode</code>|内置的警告图标|否
content|弹窗内容|<code>ReactNode</code>|<code>'This is a modal content'</code>|否
okText|确定按钮文字|<code>string</code>|<code>'confirm'</code>|否
cancelText|取消按钮文字|<code>string</code>|<code>'cancel'</code>|否
startPosition|弹窗出现与消失的起始位置，取值是视口坐标|<code>{ x: number; y: number }</code>|-|否
confirmDisabled|是否禁用确定按钮|<code>boolean</code>|<code>false</code>|否
cancelDisabled|是否禁用取消按钮|<code>boolean</code>|<code>false</code>|否
onConfirm|确定按钮回调，返回 Promise 时弹窗等它落定再关闭|<code>() =&gt; void \| Promise&lt;void&gt;</code>|-|否
onCancel|取消按钮回调，返回的 Promise **不会被等待**|<code>() =&gt; void \| Promise&lt;void&gt;</code>|-|否
mask|是否显示蒙层|<code>boolean</code>|<code>true</code>|否
maskClosable|点击蒙层是否可关闭弹窗|<code>boolean</code>|<code>false</code>|否
width|弹窗宽度，数字按 px、字符串原样使用|<code>string</code>\|<code>number</code>|<code>416</code>|否
btnClr|按钮主题色|<code>string</code>|<code>#5644b8</code>|否
footer|自定义底部内容，传 <code>null</code> 时不渲染底部|<code>(params) =&gt; ReactElement</code>\|<code>null</code>|取消 + 确定两个按钮|否
modalBody|自定义弹窗内容，会替换默认的标题、内容与底部|<code>(handleClose: () =&gt; void) =&gt; ReactElement</code>|<code>null</code>|否

### footerRenderParams
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
OkBtn|确定按钮组件，默认接的是确定逻辑|<code>FC&lt;InnerButtonProps&gt;</code>|-|否
CancelBtn|取消按钮组件，默认接的是取消逻辑|<code>FC&lt;InnerButtonProps&gt;</code>|-|否
handleClose|关闭弹窗并播放离场动画|<code>() =&gt; void</code>|-|否

### InnerButtonProps
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onClick|传了会替换默认的确定 / 取消逻辑|<code>() =&gt; void</code>|-|否
children|按钮文字，会覆盖 <code>okText</code> / <code>cancelText</code>|<code>ReactNode</code>|-|否
className|追加在内置类名之后|<code>string</code>|-|否
style|按钮行内样式|<code>CSSProperties</code>|-|否

## 注意事项
- ⚠️ `onConfirm` 返回 Promise 期间，确定按钮**不会**出现加载状态，取消按钮也**不会**被禁用 —— 按钮的 `loading` 读的是组件内部 state，而 `OkBtn` / `CancelBtn` 是用空依赖 `useMemo` 只创建一次的，闭包捕获到的值永远停在初始的 `false`（已用 React 探针实测：换成每次渲染重新定义，该值就会正常更新）。所以等待期间按钮**没有任何视觉反馈**，只有等 Promise 落定后才开始关闭。
- `onConfirm` 的 Promise **被拒绝时弹窗照样会关闭**（销毁写在 `finally` 里），错误会从点击回调里抛出去，控制台能看到 `Uncaught (in promise)`。想「失败就不关闭」，只能在 `onConfirm` 内部自己 `catch` 掉、不要 reject。
- 判断是否异步只看 `instanceof Promise`，不认 thenable —— 返回自定义的 thenable 不会被等待，弹窗会立刻关闭。
- `onCancel` 的类型也允许返回 Promise，但实现里**没有 await**：调完 `onCancel()` 就立刻开始关闭，异步逻辑拖不住弹窗。
- `title`、`content`、`okText`、`cancelText` 都有英文默认文案，**不传就会显示 `This is a modal title` 这类占位内容**。
- 不传 `startPosition` 时弹窗**没有进出场动画**，点确定/取消会立即销毁；传了才会有从该点缩放展开、再缩回该点的动画（0.3 秒），关闭也因此会延后 0.3 秒执行。
- `startPosition` 的 `x` / `y` 是**相对视口的像素坐标**，组件内部按 `innerWidth` / `innerHeight` 换算成百分比。用 `getElementCenterPosition()` 取触发元素中心点最省事，但它的 `relativeTo` 要用默认的 `'viewport'` —— 传 `'page'` / `'parent'` 得到的是别的坐标系，弹窗会偏。
- `footer` 的默认值渲染成「取消在左、确定在右」。
- `OkBtn` / `CancelBtn` 只认 `onClick`、`children`、`className`、`style` 四个属性（**不像 Popconfirm 那样能透传完整的 `ButtonProps`**），其它属性既过不了类型检查、运行时也不会被渲染。
- 使用 `modalBody` 时默认的头部、内容与底部都不再渲染，**此时自定义内容没有做点击阻断**：如果同时开了 `maskClosable`，点在内容上会冒泡到外层、被当成「点了蒙层」而关闭，需要自己在内容的根节点上 `stopPropagation`。
- `mask` 为 `false` 时既不显示蒙层、也不进入 `dialog` 的模态模式（走 `show()`），页面滚动不会被锁定；`mask` 为 `true` 时走 `showModal()`，页面不可滚动。
- `Modal()` 的返回值是 `destroy` 方法，可用于在外部主动关闭弹窗。连续调用会打开多个互相独立的弹窗，它们共用同一个 `<div id="ono-modal">` 容器，全部关闭后容器才被移除。
