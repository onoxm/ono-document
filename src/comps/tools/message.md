# Message 全局提示
在页面顶部居中展示操作反馈，提供成功、失败、警告、普通与加载中五种状态。

## 基础用法
```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button type="success" onClick={() => message.success('Success')}>
        Success
      </Button>
      <Button type="warning" onClick={() => message.warning('Warning')}>
        Warning
      </Button>
      <Button type="danger" onClick={() => message.error('Error')}>
        Error
      </Button>
      <Button type="info" onClick={() => message.info('Info')}>
        Info
      </Button>
    </div>
  )
}

export default App;
```

## loading 用法
`loading` 类型的提示不会自动消失，需要传**相同的 `key`** 再调一次其它方法把它更新掉。下面这个例子把「Loading...」原地变成「Success」。

```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() => {
          message.loading({ message: 'Loading...', key: 'loading' })
          setTimeout(
            () => message.success({ message: 'Success', key: 'loading' }),
            3000
          )
        }}
      >
        Loading
      </Button>
    </div>
  )
}

export default App;
```

## 自定义显示时长
`duration` 是从出现到消失的总时长，默认 `3000`。

```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          message.success({
            message: 'Success',
            duration: 10000
          })
        }
      >
        Success
      </Button>
    </div>
  )
}

export default App;
```

## 显示关闭按钮
```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          message.success({
            message: 'Success',
            showClose: true
          })
        }
      >
        Success
      </Button>
    </div>
  )
}

export default App;
```

## 自定义内容
`message` 传函数时可以拿到图标与关闭按钮，用来自己排版：

```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          message.success({
            showClose: true,
            message: (icon, closeButton) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {icon}
                <span>操作成功</span>
                {closeButton}
              </div>
            )
          })
        }
      >
        Success
      </Button>
    </div>
  )
}

export default App;
```

## 使用朴素样式
默认就是白底样式；传 `plain={false}` 换成对应类型的浅色底与彩色文字。

```tsx
import { Button, message } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button onClick={() => message.success('Success')}>默认</Button>
      <Button onClick={() => message.success({ message: 'Success', plain: false })}>
        彩色底
      </Button>
    </div>
  )
}

export default App;
```

## API
静态方法

- <code>message.success(message)</code>
- <code>message.warning(message)</code>
- <code>message.error(message)</code>
- <code>message.info(message)</code>
- <code>message.loading(message)</code>

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
message|提示内容，字符串会当作 <code>message</code> 字段|<code>string</code>\|<code>MessageProps</code>|-|是

### MessageProps
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
message|提示内容，传函数时入参为 <code>(icon, closeButton)</code>|<code>ReactNode</code>\|<code>(icon: ReactNode, closeButton?: ReactNode) => ReactNode</code>|-|是
key|同一条提示的唯一标识，传相同 key 会原地更新已有提示而不是新增|<code>string</code>|-|否
duration|从出现到消失的总时长，含离场动画（ms）|<code>number</code>|<code>3000</code>|否
speed|进出场动画时长（ms）|<code>number</code>|<code>300</code>|否
offset|与上一条提示之间的垂直间距（px）|<code>number</code>|<code>20</code>|否
plain|是否使用朴素样式，传 <code>false</code> 时换成对应类型的浅色底与彩色文字|<code>boolean</code>|<code>true</code>|否
showClose|是否显示关闭按钮|<code>boolean</code>|<code>false</code>|否
onClose|提示完全消失（离场动画结束）后的回调|<code>() => void</code>|-|否
zIndex|层级，新增实例时会被内部自动分配的层级覆盖|<code>number</code>|内部按序号分配|否

### MessageType
类型|说明
:- | :- 
<code>'success'</code>|成功
<code>'error'</code>|失败
<code>'warning'</code>|警告
<code>'info'</code>|普通
<code>'loading'</code>|加载中

## 注意事项
- 提示固定在页面**顶部居中**，多条并存时按创建顺序从上往下排列，`offset` 既是相邻两条的间距、也是第一条距页面顶部的距离。
- `loading` 不会自动消失，必须用相同的 `key` 再调一次把它更新掉 —— 内部每 100ms 检查一次同 key 实例是否被更新，所以从 loading 切换到其它状态最多有 100ms 延迟。
- **鼠标悬停时暂停计时，移开后按完整的 `duration` 重新计时**（不是接着剩余时间跑）。
- `duration` 包含离场动画：定时器实际是 `duration - speed`，随后再用 `speed` 播放淡出。传小于 `speed` 的 `duration` 会立刻开始消失。
- `onClose` 在离场动画结束后才触发（比定时器晚 `speed` 毫秒）。离场动画是拿一个 DOM 克隆节点播放的，原节点在动画开始时就已经从页面移除。
- 传函数形式的 `message` 时，`closeButton` 只在 `showClose` 为 `true` 时才会传入，否则该参数是 `false`，直接渲染会报错。
- `zIndex` 传了不生效：每个实例的层级由内部按序号自动分配（从 999 起递增）。
