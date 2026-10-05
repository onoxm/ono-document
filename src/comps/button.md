# Button 按钮
按钮用于触发一个即时操作，支持主题色、形状、图标以及加载、禁用等状态。

## 基础用法
```tsx
import { Button } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return <Button onClick={() => setCount(count + 1)}>count: {count}</Button>
}

export default App;
```

## 按钮类型
`type` 属性用于设置按钮的主题色，共提供六种类型。
```tsx
import { Button } from 'ono-react-element'

function App() {
  const types = [
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'default'
  ] as const

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {types.map(type => (
        <Button key={type} type={type}>
          {type}
        </Button>
      ))}
    </div>
  )
}

export default App;
```

## 朴素按钮
`plain` 属性将按钮设置为朴素样式：常态为浅色底配同色文字，鼠标悬停时填充为实色。
```tsx
import { Button } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button plain>primary</Button>
      <Button plain type="info">
        info
      </Button>
      <Button plain type="success">
        success
      </Button>
      <Button plain type="warning">
        warning
      </Button>
      <Button plain type="danger">
        danger
      </Button>
    </div>
  )
}

export default App;
```

## 按钮形状
`shape` 属性用于设置按钮形状，`round` 为圆角按钮，`circle` 为圆形按钮。
```tsx
import { Button } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button shape="default">默认</Button>
      <Button shape="round">圆角</Button>
      <Button shape="circle">+</Button>
    </div>
  )
}

export default App;
```

## 图标按钮
`icon` 接收一个 `ReactNode`，图标显示在文字左侧，两者之间会自动留出间距。
```tsx
import { Button } from 'ono-react-element'

const PlusIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M512 128a64 64 0 0 1 64 64v256h256a64 64 0 0 1 0 128H576v256a64 64 0 0 1-128 0V576H192a64 64 0 0 1 0-128h256V192a64 64 0 0 1 64-64z" />
  </svg>
)

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button icon={<PlusIcon />}>添加</Button>
      <Button type="danger" icon={<PlusIcon />}>
        删除
      </Button>
    </div>
  )
}

export default App;
```

## 加载状态
`loading` 为 `true` 时显示默认的旋转图标，加载期间按钮会被一并置为禁用，无法点击。
```tsx
import { Button } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Button loading={loading} onClick={handleClick}>
      提交
    </Button>
  )
}

export default App;
```

`loading` 也可以传入对象，通过 `icon` 自定义加载图标。
```tsx
import { Button } from 'ono-react-element'

function App() {
  return (
    <Button
      loading={{
        icon: (
          <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 128a320 320 0 1 0 0 640 320 320 0 0 0 0-640z" />
          </svg>
        )
      }}
    >
      提交
    </Button>
  )
}

export default App;
```

## 禁用状态
`disabled` 属性将按钮置为禁用状态，禁用后 `onClick` 不会触发。
```tsx
import { Button } from 'ono-react-element'

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button disabled>默认禁用</Button>
      <Button disabled plain>
        朴素禁用
      </Button>
      <Button disabled type="danger">
        危险禁用
      </Button>
    </div>
  )
}

export default App;
```

## 点击节流
`throttleDuration` 用于限制 `onClick` 的触发频率，常用于防止重复提交。传 `true` 时按 `500` 毫秒节流，传数字时按该毫秒数节流。
```tsx
import { Button } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Button throttleDuration={1000} onClick={() => setCount(count + 1)}>
      1 秒内只触发一次：{count}
    </Button>
  )
}

export default App;
```

## API
通用属性参考：通用属性

除 `type`、`disabled` 外的 button 原生属性（如 `name`、`form`、`onMouseEnter` 等）会透传到内部 `<button>` 元素上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
type|按钮类型|<code>ButtonType</code>|<code>'primary'</code>|否
htmlType|设置 button 原生 type 属性|<code>ButtonHtmlType</code>|<code>'button'</code>|否
shape|按钮形状|<code>ButtonShapeType</code>|<code>'default'</code>|否
plain|是否朴素按钮|<code>boolean</code>|<code>false</code>|否
icon|按钮图标|<code>ReactNode</code>|-|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
loading|是否显示加载中状态|<code>boolean</code>\|<code>{ delay?: number; icon?: ReactNode }</code>|<code>false</code>|否
throttleDuration|点击节流时长，传 <code>true</code> 时为 500ms|<code>boolean</code>\|<code>number</code>|<code>0</code>|否
children|按钮内容|<code>ReactNode</code>|-|否
className|自定义类名|<code>string</code>|-|否
style|自定义样式|<code>CSSProperties</code>|-|否
onClick|点击事件回调函数|<code>(e: React.MouseEvent\<HTMLButtonElement>) => void</code>|-|否

### ButtonType
类型|说明
:- | :- 
<code>'primary'</code>|主要按钮
<code>'info'</code>|信息按钮
<code>'success'</code>|成功按钮
<code>'warning'</code>|警告按钮
<code>'danger'</code>|危险按钮
<code>'default'</code>|默认按钮

### ButtonHtmlType
类型|说明
:- | :- 
<code>'button'</code>|按钮
<code>'submit'</code>|提交按钮
<code>'reset'</code>|重置按钮

### ButtonShapeType
类型|说明
:- | :- 
<code>'default'</code>|默认按钮
<code>'round'</code>|圆角按钮
<code>'circle'</code>|圆形按钮

## 注意事项
- `loading` 为 `true` 或对象时，组件会同时把按钮置为禁用，期间 `onClick` 不会触发；加载结束时图标有 0.3s 的收起动画。
- `loading` 对象的 `delay` 字段目前未生效，图标动画时长固定为 `0.3s`，只有 `icon` 会替换默认的旋转图标。
- `plain` 只对 `primary`、`info`、`success`、`warning`、`danger` 生效，`default` 类型本身已是描边样式。
