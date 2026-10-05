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
`text` 里的 `active` 与 `inactive` 是两个独立的节点，选中时显示 `active`，未选中时显示 `inactive`，两者都可选。
注意文字不会自动把开关撑宽，要用 `switchW`（或 `style.width`）留够宽度；文字比 `switchW - switchH` 还长时会被裁掉。
```tsx
import { Switch } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        switchW={64}
        switchH={24}
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

## 自定义尺寸
`switchW` / `switchH` 控制轨道宽高，数字按 px 处理，也可传 `1.5rem` 这类字符串。它们优先级高于 `style.width` / `style.height`；滑块大小、圆角、文字位移都由这两个值换算。
```tsx
import { Switch } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(true)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        switchW={72}
        switchH={36}
        checked={checked}
        onChange={value => setChecked(value)}
      />
    </div>
  )
}

export default App;
```

## 禁用状态
禁用时开关会降低透明度并显示禁止光标，点击与键盘操作都不会触发 `onChange`。
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

除 `type`、`color`、`onChange`、`disabled` 外的 input 原生属性（如 `id`、`name`、`placeholder` 等）会透传到内部 `<input>` 元素上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
checked|是否为打开状态|<code>boolean</code>|-|是
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
text|开关上显示的文字，选中显示 <code>active</code>、未选中显示 <code>inactive</code>|<code>{ active?: ReactNode; inactive?: ReactNode }</code>|-|否
color|开关颜色，传字符串只覆盖选中背景色|<code>string</code>\|<code>{ active?: string; inactive?: string }</code>|-|否
switchW|轨道宽度，数字按 px 处理，优先级高于 <code>style.width</code>|<code>number</code>\|<code>string</code>|<code>60</code>|否
switchH|轨道高度，数字按 px 处理，优先级高于 <code>style.height</code>|<code>number</code>\|<code>string</code>|<code>32</code>|否
className|自定义类名，作用在内层开关上|<code>string</code>|-|否
style|自定义样式，作用在内层开关上，其中 <code>width</code> / <code>height</code> 等价于 <code>switchW</code> / <code>switchH</code>|<code>CSSProperties</code>|-|否
onChange|状态改变时触发|<code>(checked: boolean, e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|否

## 注意事项
- `style` 与 `className` 挂在**内层的 `.ono-switch-box`** 上，不是最外层容器，所以写 `width` / `height` 改的是开关本体；该层样式已做降权处理，宿主传的 `bg-`、`w-`、`h-` 这类单类可以直接覆盖背景与尺寸。
- 开关的尺寸通过 CSS 变量 `--w` / `--h` 驱动，默认值 `60 × 32` 写在样式表里，滑块大小、圆角、文字位移都由这两个值换算。取值优先级为 `switchW` / `switchH` > `style.width` / `style.height` > 默认值；传数字按 px 处理，传字符串原样使用。
- 未选中时的默认背景色是 `rgba(0, 0, 0, 0.2)`，选中时是 `#342a7c`。`color` 只覆盖被显式指定的部分：传字符串仅写选中色，传对象可分别指定 `active` / `inactive`，未指定的回落到样式表默认值。
- 禁用由内层原生 `<input disabled>` 接管（轨道半透明 + `not-allowed` 光标），点击与键盘操作都不会触发 `onChange`。
- 内部 `<input>` 铺满整条轨道，可以像原生复选框一样用 `Tab` 聚焦，聚焦时会显示一圈 `outline`。
