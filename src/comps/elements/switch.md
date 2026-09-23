# Switch 开关
使用开关切换两种状态。

## 基础用法
```tsx
import { Switch } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch checked={checked} onChange={bl => setChecked(bl)} />
    </div>
  )
}

export default App;
```

## 自定义文本
`text` 里的 `active` 与 `inactive` 是两个独立的节点，选中时显示 `active`，未选中时显示 `inactive`。
注意文字不会自动把开关撑宽，需要自己用 `style` 调整宽度。
```tsx
import { Switch } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        style={{ width: 64, height: 24 }}
        checked={checked}
        onChange={value => setChecked(value)}
        text={{
          active: <span style={{ color: 'white' }}>开</span>,
          inactive: <span>关</span>
        }}
      />
    </div>
  )
}

export default App;
```

## 自定义开关颜色
`color` 传对象时可以分别指定选中与未选中的背景色；只传字符串则仅覆盖选中时的背景色。
```tsx
import { Switch } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        style={{ width: 48, height: 24 }}
        checked={checked}
        onChange={value => setChecked(value)}
        color={{ active: 'blue', inactive: 'red' }}
      />
    </div>
  )
}

export default App;
```

## 禁用状态
禁用时开关会降低透明度并显示禁止光标，点击不会触发 `onChange`。
```tsx
import { Switch } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Switch checked disabled />
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性

除 `type`、`color`、`onChange` 外的 input 原生属性（如 `id`、`name`、`placeholder` 等）会透传到内部 `<input>` 元素上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
checked|是否为打开状态|<code>boolean</code>|-|是
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
text|开关上显示的文字|<code>{ active: ReactNode; inactive: ReactNode }</code>|-|否
color|开关颜色，传字符串只覆盖选中背景色|<code>string</code>\|<code>{ active: string; inactive: string }</code>|-|否
className|自定义类名，作用在内层开关上|<code>string</code>|-|否
style|自定义样式，作用在内层开关上|<code>CSSProperties</code>|-|否
onChange|状态改变时触发|<code>(checked: boolean, e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|否

## 注意事项
- `style` 与 `className` 挂在**内层的 `.ono-switch-box`** 上，不是最外层容器，所以写 `width` / `height` 改的是开关本体。
- 开关的尺寸通过 CSS 变量 `--w` / `--h` 驱动，滑块大小、圆角、文字位移都由这两个值换算；**只有传了 `style` 或 `className` 时**组件才会去读计算样式，否则宽高固定为 60 × 32。
- 未选中时的默认背景色是 `rgba(0, 0, 0, 0.2)`，选中时是 `#342a7c`；`color` 只覆盖这两个值中被显式指定的部分。
