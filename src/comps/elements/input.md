# Input 输入框
输入框用于接收单行文本，支持前后标签、密码显示切换、一键清除与字数统计。

## 基础用法
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput placeholder="请输入内容" />
}

export default App;
```

## 前后标签
`prepend` 与 `append` 分别贴在输入框左右两侧，相邻的圆角会自动去掉，视觉上拼成一个整体。
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput prepend="https://" append=".com" />
}

export default App;
```

## 密码输入框
`showPassword` 为真时右侧出现眼睛图标，点击在明文与密文之间切换。
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput showPassword placeholder="请输入密码" />
}

export default App;
```

## 可清除
`clearable` 为真且当前有值时，悬停后出现清除按钮。
```tsx
import { OnoInput } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <OnoInput
      clearable
      value={value}
      placeholder="可清除"
      onClear={() => setValue('')}
      onChange={e => setValue(e.target.value)}
    />
  )
}

export default App;
```

## 前后缀
`prefix` / `suffix` 放在输入框内部的两端，适合放单位、图标等。
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput prefix="￥" suffix="元" placeholder="请输入金额" />
}

export default App;
```

## 字数统计
`showCount` 需要配合 `maxLength` 使用，只传 `showCount` 不会显示计数。
```tsx
import { OnoInput } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <OnoInput
      showCount
      maxLength={20}
      value={value}
      placeholder="最多 20 个字"
      onChange={e => setValue(e.target.value)}
    />
  )
}

export default App;
```

## 非受控用法
不传 `value` 时组件自己维护输入值，`defaultValue` 作为初始值。
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput defaultValue="初始内容" placeholder="请输入内容" />
}

export default App;
```

## 自定义边框与聚焦样式
`border` 与 `boxShadow` 只在输入框获得焦点时生效。
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return (
    <OnoInput
      border="1px solid #f00"
      boxShadow="0 0 0 2px rgba(255, 0, 0, 0.1)"
      placeholder="聚焦看看"
    />
  )
}

export default App;
```

## 禁用状态
```tsx
import { OnoInput } from 'ono-react-element'

function App() {
  return <OnoInput disabled defaultValue="不可编辑" />
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|输入框 id|<code>string</code>|-|否
name|输入框 name|<code>string</code>|-|否
type|输入框 type|<code>HTMLInputElement['type']</code>|<code>'text'</code>|否
value|输入框的值，传入即为受控|<code>string</code>|-|否
defaultValue|默认值，非受控时生效|<code>string</code>|-|否
placeholder|占位文本|<code>string</code>|-|否
readonly|是否只读|<code>boolean</code>|-|否
autocomplete|原生 autocomplete 属性|<code>string</code>|<code>'off'</code>|否
form|所属表单 id|<code>string</code>|-|否
maxLength|最大长度|<code>number</code>|-|否
minLength|最小长度|<code>number</code>|-|否
max|最大值（number 类型时）|<code>number</code>|-|否
min|最小值（number 类型时）|<code>number</code>|-|否
disabled|是否禁用|<code>boolean</code>|-|否
clearable|是否可清除|<code>boolean</code>|-|否
showPassword|是否显示密码切换图标|<code>boolean</code>|-|否
showCount|是否显示字数统计，需配合 <code>maxLength</code>|<code>boolean</code>|-|否
prepend|输入框左侧标签|<code>ReactNode</code>|-|否
append|输入框右侧标签|<code>ReactNode</code>|-|否
prefix|输入框内前缀|<code>ReactNode</code>|-|否
suffix|输入框内后缀|<code>ReactNode</code>|-|否
border|聚焦时的边框|<code>string</code>|<code>1px solid #5644b8</code>|否
boxShadow|聚焦时的阴影|<code>string</code>|<code>0 0 0 2px #7969d11a</code>|否
className|自定义类名，作用在输入框内层|<code>string</code>|-|否
onClear|点击清除按钮时触发|<code>() => void</code>|-|否
onChange|输入内容改变时触发|<code>(event: ChangeEvent\<HTMLInputElement>) => void</code>|-|否
onFocus|获得焦点时触发|<code>(event: ChangeEvent\<HTMLInputElement>) => void</code>|-|否
onBlur|失去焦点时触发|<code>(event: ChangeEvent\<HTMLInputElement>) => void</code>|-|否
onKeyUp|按键抬起时触发|<code>(event: KeyboardEvent\<HTMLInputElement>) => void</code>|-|否
onKeyDown|按键按下时触发|<code>(event: KeyboardEvent\<HTMLInputElement>) => void</code>|-|否

## 注意事项
- 组件导出的名字是 **`OnoInput`**，不是 `Input`。
- 是否受控只看 `value` 是否为 `undefined`：传了就是受控，组件不会自己改值。
- 受控状态下点击清除按钮**只会触发 `onClear`，不会把输入框清空** —— 需要在 `onClear` 里自己把 `value` 置空；非受控时组件才会清空内部值。
- `clearable` 的清除按钮只在「非禁用 且 当前有值」时出现。
- `showPassword` 会接管 `type`：它存在时 `type` 只会是 `password` 或 `text`，此时再传 `type` 不起作用。
- `border` / `boxShadow` 只在聚焦时生效，未聚焦时用的是默认的描边样式。
- `className` 挂在内层的 `.ono-input-wrapper` 上；该层样式已做降权处理，宿主的单类可以直接覆盖背景、内边距等。
- 属性名是小写的 `readonly` 与 `autocomplete`，组件内部会映射成原生的 `readOnly` / `autoComplete`；组件只透传上表列出的字段，其余原生属性不会传给内部 `<input>`。
