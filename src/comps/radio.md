# Radio 单选框
单选框用于在多个选项中选取一个。

## 单个单选框用法
`checked` 是受控值，需要自己维护。根元素是一个 `<label>`，点圆点或点文字都能切换。

```tsx
import { useState } from 'react'
import { Radio } from 'ono-react-element'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Radio
        value="javascript"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      >
        JavaScript
      </Radio>
    </div>
  )
}

export default App;
```

## 多个单选框用法
`RadioGroup` 由 `options` 生成整组单选框，只需要维护一个 `value`。

```tsx
import { useState } from 'react'
import { RadioGroup } from 'ono-react-element'

function App() {
  const [language, setLanguage] = useState<string>('html')

  const languageList = [
    {
      value: 'html',
      label: 'HTML'
    },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' }
  ]

  return (
    <div style={{ width: '100%' }}>
      <RadioGroup
        value={language}
        options={languageList}
        onChange={value => setLanguage(value as string)}
      />
    </div>
  )
}

export default App;
```

## 自定义外观
`radioW` / `radioGap` 控制圆点尺寸与间距，`color` 控制填充色：传对象时分别指定选中（`active`）与未选中（`inactive`），传字符串则只换选中色、未选中回落到默认的透明。`labelPosition` 决定文字在圆点哪一侧。`RadioGroup` 的根元素是一个 flex 容器，`style` 里可以直接写 `gap`、`flexDirection` 等布局属性。

```tsx
import { useState } from 'react'
import { RadioGroup } from 'ono-react-element'

function App() {
  const [language, setLanguage] = useState<string>('vue')

  const languageList = [
    {
      label: 'vue',
      value: 'vue'
    },
    {
      label: 'react',
      value: 'react'
    },
    {
      label: 'angular',
      value: 'angular'
    }
  ]

  return (
    <div style={{ width: '100%' }}>
      <RadioGroup
        radioW={24}
        value={language}
        options={languageList}
        color={{ active: '#f00', inactive: '#fff' }}
        labelPosition="left"
        style={{
          fontSize: '24px',
          fontWeight: 700,
          gap: 8,
          flexDirection: 'column'
        }}
        radioGap={16}
        onChange={value => setLanguage(value as string)}
      />
    </div>
  )
}

export default App;
```

## 只换选中色
`color` 传字符串时只覆盖选中色，未选中保持默认的透明底。
```tsx
import { useState } from 'react'
import { RadioGroup } from 'ono-react-element'

function App() {
  const [language, setLanguage] = useState<string>('css')

  const languageList = [
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'js' }
  ]

  return (
    <div style={{ width: '100%' }}>
      <RadioGroup
        color="#16a34a"
        value={language}
        options={languageList}
        onChange={value => setLanguage(value as string)}
      />
    </div>
  )
}

export default App;
```

## API

### Radio
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|该单选框的值|<code>T</code>|-|是
name|原生 <code>name</code>，用于把同一组的单选框关联起来|<code>string</code>|-|否
checked|是否选中（受控）|<code>boolean</code>|-|是
children|圆点右侧显示的内容|<code>ReactNode</code>|-|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
radioW|圆点直径，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>16</code>|否
radioGap|圆点与内容之间的间距，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>4</code>|否
className|根元素（<code>label</code>）的类名|<code>string</code>|-|否
style|根元素（<code>label</code>）的样式|<code>CSSProperties</code>|-|否
color|填充色，传字符串只覆盖选中色|<code>string</code>\|<code>{ active?: string; inactive?: string }</code>|<code>#532ce1</code> / <code>transparent</code>|否
onChange|选中状态变化时触发|<code>(e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|是

### RadioGroup
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|当前选中的值|<code>T</code>|-|是
name|原生 <code>name</code>，透传给组内每个单选框|<code>string</code>|-|否
options|选项列表|<code>RadioItemType\<T>[]</code>|-|是
radioW|圆点直径，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>16</code>|否
radioGap|圆点与内容之间的间距，数字按 px 处理|<code>string</code>\|<code>number</code>|<code>4</code>|否
style|根元素（<code>div</code>）的样式|<code>CSSProperties</code>|-|否
className|根元素（<code>div</code>）的类名|<code>string</code>|-|否
color|填充色，传字符串只覆盖选中色|<code>string</code>\|<code>{ active?: string; inactive?: string }</code>|<code>#532ce1</code> / <code>transparent</code>|否
labelPosition|文字相对圆点的位置|<code>'left'</code>\|<code>'right'</code>|<code>'right'</code>|否
onChange|选中项变化时触发，参数是选中项的值|<code>(value: T) => void</code>|-|是

### RadioItemType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|选项的值|<code>T</code>|-|是
label|选项的文字|<code>string</code>|-|是
disabled|是否禁用该项，传函数时按分组当前选中值判断|<code>boolean</code>\|<code>(value: T) => boolean</code>|-|否

## 注意事项
- `Radio` 的根元素是 `<label>`，内部的 `<input type="radio">` 铺满了整个圆点：点圆点或点文字都能切换；禁用时由原生 `disabled` 接管，不响应点击。键盘上用 `Tab` 聚焦，**同组的单选框传了相同的 `name` 时**还能用方向键在组内切换。
- `radioW` / `radioGap` / `color` 是通过 CSS 变量（`--w` / `--gap` / `--checkedColor` / `--unCheckedColor`）注入的，默认值写在样式里，所以首帧就是最终尺寸与颜色，不会先闪一下默认样式；`style` 里写同名变量可以覆盖它们。`color` 只传字符串时仅写 `--checkedColor`，`--unCheckedColor` 保持样式表默认值。
- 圆点自身不显示文字：`children` 会被放进圆点右侧的 `<span>` 中，并带 `user-select: none`。
- 有额外的交互动效：悬停未禁用项时圆点边框会变成选中色（`--checkedColor`），键盘聚焦时有外描边，禁用项整体半透明并使用 `not-allowed` 光标。
- `RadioGroup` 用 `String(选中值) === String(选项值)` 判断是否选中，因此数字 `1` 与字符串 `'1'` 会被视为同一项。
- `options` 里 `disabled` 传函数时，**入参是分组的当前选中值，不是该选项自身的值**。想按选项自身判断，请传布尔值，或先在 `options` 里把结果算好。
