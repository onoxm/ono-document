# Toast 轻提示
在页面顶部居中弹出一条轻量提示，新的提示插在最上方，支持成功、失败、警告以及跟随 Promise 结果的加载态提示。

## 基础用法
```tsx
import { Button, toast } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button type="success" onClick={() => toast.success('成功')}>
        成功
      </Button>
      <Button type="danger" onClick={() => toast.error('失败')}>
        失败
      </Button>
      <Button type="warning" onClick={() => toast.warning('警告')}>
        警告
      </Button>
    </div>
  )
}

export default App;
```

## Promise 用法
`toast.promise` 接收一个 Promise 或返回 Promise 的函数，先显示 `promiseOptions.loading`，成功后原地换成成功文案、失败换成失败文案。

```tsx
import { useState } from 'react'
import { Button, toast } from 'ono-react-element'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Button
        type="info"
        loading={loading}
        onClick={() =>
          toast.promise(
            () =>
              new Promise<string>((resolve, reject) => {
                setLoading(true)
                const random = Math.random()
                setTimeout(() => {
                  random < 0.5 ? resolve('加载成功') : reject('失败')
                  setLoading(false)
                }, 3000)
              }),
            {
              success: msg => msg,
              error: '加载失败',
              loading: '正在加载...'
            }
          )
        }
      >
        延时
      </Button>
    </div>
  )
}

export default App;
```

## 自定义时长与间距
`duration` 是整条提示的生命周期，`offset` 控制相邻两条提示的间距。

```tsx
import { Button, toast } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%', display: 'flex', gap: 10 }}>
      <Button
        onClick={() =>
          toast.success({
            message: '这条会显示 5 秒',
            duration: 5000
          })
        }
      >
        5 秒
      </Button>
      <Button
        onClick={() => {
          toast.success({ message: '第一条', offset: 40 })
          toast.warning({ message: '第二条', offset: 40 })
        }}
      >
        间距 40
      </Button>
    </div>
  )
}

export default App;
```

## 自定义样式
`className` 加在内层内容盒上，`style` 加在最外层的定位容器上。

```tsx
import { Button, toast } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Button
        onClick={() =>
          toast.success({
            message: '自定义样式',
            className: 'my-toast',
            style: { marginTop: 40 }
          })
        }
      >
        自定义样式
      </Button>
    </div>
  )
}

export default App;
```

## API
静态方法

- <code>toast.success(message)</code>
- <code>toast.error(message)</code>
- <code>toast.warning(message)</code>
- <code>toast.promise(promise, options)</code>

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
message|提示文案，字符串会当作 <code>message</code> 字段|<code>string</code>\|<code>ToastProps</code>|-|是

### ToastProps
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
message|提示文案|<code>string</code>|-|是
duration|从出现到消失的总时长，含离场动画（ms）|<code>number</code>|<code>2000</code>|否
speed|进出场动画时长（ms）|<code>number</code>|<code>200</code>|否
offset|与相邻提示之间的垂直间距（px）|<code>number</code>|<code>20</code>|否
className|内层内容盒的类名|<code>string</code>|-|否
style|最外层定位容器的样式|<code>CSSProperties</code>|-|否
promiseOptions|仅 <code>toast.promise</code> 使用|<code>PromiseOptionsType</code>|-|否
instancesKey|相同标识的提示会被原地更新|<code>string</code>|<code>toast.promise</code> 固定为 <code>'toast-promise'</code>|否
zIndex|层级，新增实例时会被内部自动分配的层级覆盖|<code>number</code>|内部按序号分配|否

### PromiseOptionsType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
loading|加载中的文案|<code>string</code>|-|是
success|成功文案，传函数时入参为 Promise 的 resolve 值|<code>string</code>\|<code>(message: string) => string</code>|-|是
error|失败文案，传函数时入参为 reject 的原因|<code>string</code>\|<code>(message: string) => string</code>|-|否

### MessageType
类型|说明
:- | :- 
<code>'success'</code>|成功
<code>'error'</code>|失败
<code>'warning'</code>|警告
<code>'promise'</code>|跟随 Promise 结果

## 注意事项
- 提示固定在页面**顶部居中**，新提示插在最上方，已有提示会被顶向下方（Message 相反，新提示追加在下方）。
- Toast 只有 `success`、`error`、`warning` 三个静态方法和一个 `promise`，没有 `info`、也没有关闭按钮，并且**不对外暴露关闭方法**，只能等它自动消失（`promise` 类型则要等 Promise 落定）。
- `toast.promise` 内部固定使用 `instancesKey: 'toast-promise'`，所以同一时间只有一条 Promise 提示，再次调用会**原地更新**那一条而不是新开一条；Promise 落定后内部用 `isUseEnterAnimation: false` 更新，不会重播入场动画。
- 鼠标悬停时暂停计时，移开后按完整的 `duration` 重新计时。
- `duration` 包含离场动画：定时器是 `duration - speed`，随后用 `speed` 播放淡出；离场动画由一个 DOM 克隆节点播放，原节点在动画开始时就已经从页面移除。
- `className` 作用在内层内容盒（`.ono-toast-base` / `.ono-toast-promise`）上，`style` 作用在最外层定位容器上 —— 改背景、圆角用 `className`，改位置、层级用 `style`。
- `zIndex` 传了不生效：每个实例的层级由内部按序号自动分配。
