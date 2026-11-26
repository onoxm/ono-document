# Select 下拉选择
下拉选择器，从一组选项中选择一个值，支持搜索过滤、键盘操作与自定义渲染。

## 基础用法
`options` 提供候选项，`defaultValue` 指定初始选中值，选中后 `onChange` 拿到该项的 `value`。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('2')

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true }
  ]

  return (
    <div style={{ width: '320px' }}>
      <div>当前选中：{value}</div>
      <OnoSelect
        clearable
        defaultValue="2"
        placeholder="请选择"
        options={options}
        onChange={value => setValue(value)}
        onClear={() => setValue('')}
      />
    </div>
  )
}

export default App;
```
⚠️ 清空（点右侧清除按钮）**不会**触发 `onChange`，只触发 `onClear`。只在 `onChange` 里同步外部 state 的写法必须补上 `onClear`，否则清空后组件内部空了、外部 state 还停在旧值，而且不会报错。

## 值类型自动推断
`T` 由 `options[].value` **自动推断**，不必手写泛型；`string` / `number` / 自定义对象（枚举、symbol 等）都原样推出。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

interface CityValue {
  code: number
  name: string
}

function App() {
  const [city, setCity] = useState<CityValue | null>(null)

  const options: Array<{ label: string; value: CityValue }> = [
    { label: '北京', value: { code: 10, name: 'beijing' } },
    { label: '上海', value: { code: 21, name: 'shanghai' } }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        placeholder="选择城市"
        options={options}
        onChange={value => setCity(value)}
      />
      <div>{city ? `${city.name}(${city.code})` : '未选择'}</div>
    </div>
  )
}

export default App;
```
不要给 `options` 写显式类型注解，也不要手写 `<OnoSelect<string>>` —— 推断是整体的，显式注解会把 `value` 收成注解里的那个类型，字面量联合那点精确性就丢了。

## 键盘选择
下拉展开后可用键盘操作：`↑` / `↓` 移动高亮游标（自动跳过 `disabled` 选项、把游标滚进可视区），`Enter` 选中并关闭。鼠标悬停与键盘**共用同一个游标**，两者不会各亮一处。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen', disabled: true },
    { label: '杭州', value: 'hangzhou' },
    { label: '成都', value: 'chengdu' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect placeholder="展开后用方向键选择" options={options} />
    </div>
  )
}

export default App;
```
默认走到两端就**停住**（不环绕），要环绕见下一节。

## 键盘环绕
`loop` 为真时，在**第一项**按 `↑` 落到最后一个可用项，在**最后一项**按 `↓` 落到第一个可用项。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = Array.from({ length: 12 }, (_, i) => ({
    label: `第 ${i + 1} 项`,
    value: String(i + 1)
  }))

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect loop placeholder="到两头会环绕" options={options} />
    </div>
  )
}

export default App;
```
环绕与「跳过 `disabled`」是**叠加**的 —— 落到的是两端第一个**可用**项，而不是死板的「索引 0 / 最后一项」。它只作用于键盘：指针悬停是「直接指定索引」，没有方向可言。

## 限制下拉显示项数
`showOptionEntries` 控制下拉**最多同时显示几项**，超出的部分靠滚动查看，默认 `4`；传 `0` 表示不限制高度、整列铺开。它只影响「看得见几项」，不影响能选哪些。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = Array.from({ length: 12 }, (_, i) => ({
    label: `第 ${i + 1} 项`,
    value: String(i + 1)
  }))

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        showOptionEntries={8}
        placeholder="最多显示 8 项，超出滚动"
        options={options}
      />
    </div>
  )
}

export default App;
```
下拉的滚动条是组件**自绘**的（原生滚动条已隐藏，效果对齐 antd，含闲置淡出、拖拽）。上限不是写死的像素：行高是运行时量到的首项真实高度，再乘 `showOptionEntries` 换算成 `max-height`，同一个数也传给内部的 `scrollToItem`。

## 可清除
`clearable` 为真时，鼠标悬停在选择器上且已有选中值，右侧会出现清除按钮。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect clearable placeholder="请选择" options={options} />
    </div>
  )
}

export default App;
```

## 搜索过滤
开启 `filterOption` 后输入框变为可输入，默认按 `label` 做不区分大小写的包含匹配。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'py' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect filterOption placeholder="输入关键字搜索" options={options} />
    </div>
  )
}

export default App;
```

## 自定义过滤规则
`filterOption` 也可以传函数，参数为当前关键字与完整选项列表，返回过滤后的列表。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'py' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        placeholder="输入关键字搜索"
        options={options}
        filterOption={(keyword, list) =>
          list.filter(opt => opt.value.includes(keyword.toLowerCase()))
        }
      />
    </div>
  )
}

export default App;
```

## 两个箭头开关
`isShowArrow` 管的是**下拉浮层气泡上**那个小三角，`showTriggerArrow` 管的是**触发器里**那个 chevron —— 两者互不相干。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect isShowArrow={false} placeholder="去掉浮层小三角" options={options} />
      <OnoSelect showTriggerArrow={false} placeholder="去掉触发器箭头" options={options} />
    </div>
  )
}

export default App;
```
传了 `trigger` 之后两个开关都不再生效：触发器由调用方渲染，库里不会往里塞任何东西。

## 自定义选项渲染
`children` 是渲染函数，三个参数依次为：选项自身、是否选中、是否为当前游标。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect placeholder="请选择" options={options}>
        {(option, isSelected, isCursor) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{option.label}</span>
            <span>{isSelected ? '✓' : isCursor ? '›' : ''}</span>
          </div>
        )}
      </OnoSelect>
    </div>
  )
}

export default App;
```
传了 `children` 就**完全接管**选项内部渲染，库默认那套 DOM 不再生成 —— 默认的选中 / 游标修饰类**不会自动加**，要自己按 `isSelected` / `isCursor` 套。

## 无匹配数据
`notFoundContent` 用于自定义「没有选项」时的展示，默认为 `No Data`。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        filterOption
        options={[]}
        placeholder="请选择"
        notFoundContent="没有找到匹配的选项"
      />
    </div>
  )
}

export default App;
```

## 禁用状态
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect disabled placeholder="不可选择" options={options} />
    </div>
  )
}

export default App;
```

## 自定义外观
`classNames` 与 `styles` 各提供 `select` / `panel` / `option` 三个落点，**一一对应**：

- `select` → 触发器外层：内置触发器时是 `.ono-select`（里面是 `OnoInput`），传了 `trigger` 时是包住它的 `.ono-select-trigger`
- `panel` → 下拉面板容器（`.ono-option-container`）
- `option` → 每个选项的外层按钮（`.ono-option-item`）

`classNames` 用来挂宿主的样式表（能写 `:hover`、伪元素、媒体查询）；`styles` 直接写行内样式（永远赢，但**覆盖不了** `:hover` 态）。两者的 `option` 都支持**函数形式**，按该项的状态算。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        placeholder="请选择"
        options={options}
        classNames={{
          option: ({ isCursor, isSelected }) =>
            isSelected ? 'option-selected' : isCursor ? 'option-cursor' : ''
        }}
        styles={{
          select: { borderRadius: 18, backgroundColor: '#fff8e1' },
          panel: { padding: '6px 10px' }
        }}
      />
    </div>
  )
}

export default App;
```
`classNames.option` 落在选项**外层**按钮上，所以即使传了 `children` 自定义渲染也照样生效。`styles` 的 `select` 落点与触发器的 `style` 同元素（内置触发器时就是 `OnoInput` 的 `style`），展开在组件内置的 CSS 变量**之后** —— 因此可以直接覆盖 `--ono-input-border`（前提是先聚焦输入框，让 Input 消费该变量）。

## 受控选中值
传了 `value` 之后选中值归外部 state 所有，组件不再自己存一份。

`value` 是对象 / 数组时要注意：默认判等是 `Object.is`，也就是**引用比较**。从 store、`localStorage` 恢复出来的对象字段全等、但引用不同，会被判成「没选中」（输入框空白、列表不高亮）—— **而且不报错**。用 `compare` 换成按业务主键比较即可。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

interface ModelValue {
  id: string
  name: string
}

const modelOptions: Array<{ label: string; value: ModelValue }> = [
  { label: 'GPT-4o', value: { id: 'gpt-4o', name: 'GPT-4o' } },
  { label: 'Claude 3.7', value: { id: 'claude-3-7', name: 'Claude 3.7' } },
  { label: 'DeepSeek V4', value: { id: 'deepseek-v4', name: 'DeepSeek V4' } }
]

function App() {
  // 这个对象与 modelOptions 里的那个引用不同，靠 compare 才认得出是同一个模型
  const [saved, setSaved] = useState<ModelValue | null>({
    id: 'claude-3-7',
    name: 'Claude 3.7'
  })

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        clearable
        options={modelOptions}
        value={saved ?? undefined}
        compare={(a, b) => a.id === b.id}
        onChange={setSaved}
        onClear={() => setSaved(null)}
      />
      <div>当前：{saved ? saved.name : '未选择'}</div>
    </div>
  )
}

export default App;
```
受控用法下**清空必须接 `onClear`**：清空不回调 `onChange`，只有把外部 state 也置空，界面才会跟着变（组件自己那份值在受控期间根本不会被写）。

## 受控开合
想从外部驱动面板开合（快捷键唤出、全局搜索、打开前先摆好游标位置）时用 `open`。`onDropdownVisibleChange` 只能事后收到信号，收不到「我要打开」这个意图。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        options={options}
        open={open}
        onDropdownVisibleChange={setOpen}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => setOpen(true)}>外部打开</button>
        <button onClick={() => setOpen(false)}>外部关闭</button>
      </div>
    </div>
  )
}

export default App;
```
受控之后 `onDropdownVisibleChange` **依然会响**（它报的是「用户想开 / 想关」），但必须把它写回 `open` —— 漏了的话点触发器、按 `Esc` 都不会有反应。

## 自定义触发器
`trigger` 把「触发器长什么样」整块交给调用方，库里只负责挂事件与无障碍属性。传节点、或传一个按状态渲染的函数都行。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState<string | null>('gpt-4o')

  const options = [
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'Claude 3.7', value: 'claude-3-7' },
    { label: 'DeepSeek V4', value: 'deepseek-v4' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        options={options}
        value={value ?? undefined}
        onChange={setValue}
        sameWidth={false}
        dropdownWidth={320}
        trigger={({ open, selectedLabel }) => (
          <span
            style={{
              display: 'inline-flex',
              gap: 6,
              padding: '6px 12px',
              border: '1px solid #d6ccff',
              borderRadius: 999,
              background: open ? '#e6e1ff' : '#f3f0ff',
              cursor: 'pointer'
            }}
          >
            {selectedLabel || '选择模型'}
            <i style={{ fontSize: 10, opacity: 0.6 }}>{open ? '▴' : '▾'}</i>
          </span>
        )}
      />
    </div>
  )
}

export default App;
```
函数形式的参数是一个快照：`open` / `disabled` / `selectedValue` / `selectedOption` / `selectedLabel` / `hasSelection` / `placeholder` / `searchValue`，外加 `setSearchValue` / `setOpen` / `toggle`。

传了 `trigger` 之后，`placeholder` / `inputBorder` / `clearable` / `showTriggerArrow` 这些**描述内置输入框**的字段一律不生效 —— 触发器里长什么样全归你，库里不会往里塞任何东西。

## 面板内容插槽
`dropdownRender` 拿到库算好的「菜单」（选项列表 + 滚动条），在外面包什么都行 —— 面板标题、底部操作区是常见用法。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState<string | null>(null)

  const options = [
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'Claude 3.7', value: 'claude-3-7' },
    { label: 'DeepSeek V4', value: 'deepseek-v4' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect
        options={options}
        value={value ?? undefined}
        onChange={setValue}
        dropdownRender={menu => (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 8px 8px',
                borderBottom: '1px solid #f0f0f0',
                marginBottom: 4,
                fontSize: 12,
                color: '#666'
              }}
            >
              <strong style={{ color: '#333', fontSize: 13 }}>选择模型</strong>
              <span>{options.length} 个可用</span>
            </div>
            {menu}
          </>
        )}
      />
    </div>
  )
}

export default App;
```
包出来的内容在面板**内边距之内**，但**在滚动容器之外** —— 列表滚动时标题不动。想让它跟着列表一起滚，得放进 `children` 自定义选项里，而不是这里。

## 定位与尺寸
`placement` 决定浮层方位（取值同 popper：`bottom-start` / `bottom-end` / `top` / `right-start` …），`sameWidth` 与 `dropdownWidth` 管宽度，`dropdownMaxHeight` 管高度。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ width: 220 }}>
        <OnoSelect defaultValue="2" options={options} placement="bottom-end" />
      </div>
      <div style={{ width: 220 }}>
        <OnoSelect
          defaultValue="2"
          options={options}
          sameWidth={false}
          dropdownWidth={280}
          dropdownMaxHeight={110}
        />
      </div>
    </div>
  )
}

export default App;
```
面板默认 `placement="bottom-start"`（左下对齐）且 `sameWidth` 打开 —— 此时面板与触发器同宽，居中和左对齐是同一个位置，所以看不出差别。想看出方位差异要先关掉 `sameWidth`。

`sameWidth` 的默认值跟着 `dropdownWidth` 走：给了宽度就默认 `false`，否则宽度会被触发器的 `offsetWidth` 覆盖。

`dropdownMaxHeight` 给了之后，「一屏几项」由 `floor(高度 / 行高)` 算出来，与键盘滚动用的是**同一个数** —— 不会出现「CSS 只画 3 行、JS 以为 5 行」这种错位。

## 无头用法
`OnoSelect` 本身就是「`useSelect` + `PopoverBase` + 内置输入框触发器」拼起来的。要换整套外观不必再去骗过输入框（透明热区、隐藏箭头那套补丁），直接用零件自己拼：

- [useSelect](/comps/useSelect)：选中 / 游标 / 开合 / 过滤 / 键盘 / 外部点击，一个像素的外观都没有
- [SelectPanel](/comps/selectPanel)：列表 + 滚动条 + 空态 + `Esc`，只消费 `useSelect` 的返回值

chip、图标按钮、只读文本这类触发器，最常见的组合是「`useSelect` + 自己的触发器 + `SelectPanel`」，行为与 `OnoSelect` 完全一致。

## 实时预览与取消回滚

`onActiveChange` 报的是**游标**（鼠标划过 / 键盘上下浏览但还没回车的那一项），不是选中值 —— 它不写回、不关闭面板。配合 `onChange`（确认）与 `onCancel`（取消）可以做出「浏览时实时预览、取消就回滚」的效果，字体选择器是最典型的场景：

```tsx
import { OnoSelect } from 'ono-react-element'
import { useRef, useState } from 'react'

const fonts = [
  { label: '系统默认', value: 'system-ui' },
  { label: '等宽字体', value: 'monospace' },
  { label: '宋体', value: 'serif' }
]

function App() {
  // 当前**用于预览**的字体
  const [preview, setPreview] = useState('system-ui')
  // 打开面板前已确认的值，取消时回滚到它
  const confirmedRef = useRef('system-ui')

  return (
    <div style={{ fontFamily: preview, minHeight: 120 }}>
      <p>鼠标划过选项，这段文字会跟着变；点面板外面会回滚。</p>
      <OnoSelect
        options={fonts}
        defaultValue="system-ui"
        onDropdownVisibleChange={open => {
          if (open) confirmedRef.current = preview
        }}
        // 浏览中：只改预览。reason 为 'auto' 的不是用户操作（挂载 / 过滤归位），要排除
        onActiveChange={(value, _option, reason) => {
          if (reason !== 'auto' && value !== undefined) setPreview(value)
        }}
        // 确认：把预览落成正式值
        onChange={value => setPreview(value)}
        // 取消：回滚到打开前
        onCancel={() => setPreview(confirmedRef.current)}
      />
    </div>
  )
}

export default App;
```

三个回调各管一件事：`onActiveChange` = 浏览中、`onChange` = 确认、`onCancel` = 取消。确认型关闭时 `onChange` **先**触发、`onDropdownVisibleChange(false)` 后触发，所以「先落值再收关闭信号」不会把刚确认的值回滚掉。

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|选项列表，`T` 由它推断|<code>SelectOption\<T>[]</code>|-|是
defaultValue|初始选中值，类型与 <code>options[].value</code> 同源|<code>T</code>|-|否
value|**受控**选中值；传了它（<code>!== undefined</code>）组件就不再自己存值|<code>T</code>|-|否
compare|选中判定，默认 <code>Object.is</code>；换了它，选中态 / 游标初始落点 / <code>onActiveChange</code> 去重**三处同时**跟着变|<code>(a: T, b: T) => boolean</code>|<code>Object.is</code>|否
placeholder|未选中时的占位文本|<code>string</code>|-|否
isShowArrow|是否显示下拉**浮层**上的小三角|<code>boolean</code>|<code>true</code>|否
showTriggerArrow|是否显示**触发器里**那个 chevron；传了 <code>trigger</code> 时不生效|<code>boolean</code>|<code>true</code>|否
inputBorder|选择器输入框的边框|<code>string</code>|-|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
clearable|是否可清除，悬停且已有值时显示清除按钮；传了 <code>trigger</code> 时不生效|<code>boolean</code>|<code>false</code>|否
trigger|触发器插槽：传节点，或传 <code>(state) => ReactNode</code> 按状态渲染|<code>SelectTriggerRender\<T></code>|-|否
dropdownRender|面板内容的渲染器，参数是库算好的菜单节点|<code>(menu: ReactNode) => ReactNode</code>|-|否
open|**受控**开合|<code>boolean</code>|-|否
defaultOpen|非受控的初始开合状态|<code>boolean</code>|<code>false</code>|否
placement|浮层方位，取值同 popper（<code>bottom-start</code> / <code>bottom-end</code> / <code>top</code> …）|<code>Placement</code>|<code>'bottom-start'</code>|否
sameWidth|面板宽度是否跟随触发器；传了 <code>dropdownWidth</code> 时默认变为 <code>false</code>|<code>boolean</code>|<code>true</code>|否
dropdownWidth|面板宽度，数字按 px 处理|<code>number</code>\|<code>string</code>|-|否
dropdownMaxHeight|面板高度上限（px）；给了它之后 <code>showOptionEntries</code> 不再参与算高|<code>number</code>|-|否
closeOnEsc|面板打开时按 <code>Esc</code> 是否关闭|<code>boolean</code>|<code>true</code>|否
classNames|三个部件的补充类名|<code>SelectClassNames\<T></code>|-|否
styles|三个部件的补充行内样式，落点与 <code>classNames</code> 一一对应|<code>SelectStyles\<T></code>|-|否
notFoundContent|无匹配项时的内容|<code>ReactNode</code>|<code>'No Data'</code>|否
children|自定义选项渲染，参数为「选项 / 是否选中 / 是否为游标」|<code>(option: SelectOption\<T>, isSelected: boolean, isCursor: boolean) => ReactNode</code>|-|否
filterOption|是否开启搜索，传函数可自定义过滤规则|<code>boolean</code>\|<code>(keyword: string, options: SelectOption\<T>[]) => SelectOption\<T>[]</code>|-|否
showOptionEntries|下拉最多同时显示几项，超出部分滚动查看；传 <code>0</code> 表示不限制|<code>number</code>|<code>4</code>|否
loop|键盘走到两端时是否环绕|<code>boolean</code>|<code>false</code>|否
onClear|清空时触发（点击清除按钮）|<code>() => void</code>|-|否
onChange|**真正选中某一项时**触发，参数为该项的 <code>value</code>|<code>(value: T) => void</code>|-|否
onActiveChange|**游标（临时高亮项）变化**时触发；选中值不变、不写回、不关面板|<code>(value: T \| undefined, option: SelectOption\<T> \| undefined, reason: SelectActiveChangeReason) => void</code>|-|否
onDropdownVisibleChange|下拉面板打开 / 关闭时触发|<code>(open: boolean) => void</code>|-|否
onCancel|面板关闭、且本次打开期间**没有**发生过 <code>onChange</code> 时触发|<code>() => void</code>|-|否
getPopupContainer|下拉浮层的落点解析器，不传则走内置解析链|<code>PopupContainerResolver</code>|-|否

### SelectActiveChangeReason
`onActiveChange` 第三个参数，说明游标这次**为什么**变了。

类型值|说明
:- | :-
<code>'keyboard'</code>|键盘 <code>↑</code> / <code>↓</code> 移动
<code>'mouse'</code>|指针悬停（键盘按下后的 300ms 占用期内会被抑制）
<code>'auto'</code>|**不是用户操作** —— 挂载、<code>options</code> 变化、过滤结果变化后游标自动归位。做「用户正在浏览」的埋点时要排除它

### SelectOption
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
label|选项显示文本|<code>string</code>|-|是
value|选项的值，同时也是 <code>T</code> 的来源|<code>T</code>|-|是
disabled|是否禁用该选项|<code>boolean</code>|<code>false</code>|否

### SelectOptionState
传给 `classNames.option` / `styles.option` 的函数形式、以及 `children` 第三个参数的状态来源。三个判定值都由组件算好传入，不要在消费方重新推导。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
isSelected|是否为当前选中项（按 <code>value</code> 判等，不是 label）|<code>boolean</code>|-|是
isCursor|是否为键盘 / 悬停游标所在项|<code>boolean</code>|-|是
disabled|是否为禁用项|<code>boolean</code>|-|是
option|该项自身|<code>SelectOption\<T></code>|-|是

## 注意事项
- 组件导出的名字是 **`OnoSelect`**，不是 `Select`；`SelectProps` / `SelectOption` / `SelectClassNames` / `SelectStyles` / `SelectOptionState` 等类型也都从包入口导出。
- 受控与非受控二选一：传 `value` 即为受控（判据是 `!== undefined`），否则读 `defaultValue` / 内部状态。⚠️ **受控时不要再用 `defaultValue`** —— 清空后若把 `value` 传成 `undefined`，组件会切回非受控、退回 `defaultValue` 显示。
- `defaultValue` 是「初始高亮项」与「初始选中项」的依据，仅在 `defaultValue` 变化时同步；选中项的显示文案是从 `options` **实时派生**的 —— `options` 异步后到、或宿主改了同名 `value` 的 `label` 文案，显示与高亮都会自动跟随。
- 「谁被选中」一律按 **`value`** 判等，不是 `label` —— `label` 只是显示文案，可以重复、可以改名、可以异步后到。所以 `label` 相同的选项只会点亮真正选中的那一个，`children` 的 `isSelected` 同理。
- ⚠️ **清空不再回调 `onChange`**，只触发 `onClear`（更早的版本会回调 `onChange('')`）。所以 `onChange` 的参数类型就是干净的 `T`（`number` / 自定义类型不会再收到字符串），代价是清空这条通知要另接 `onClear`。
- `T` 完全由 `options[].value` 推断，对 `string` / `number` 之外的类型同样成立。**别给 `options` 写显式类型注解、也别手写泛型参数**，否则推断会被收窄。
- 选项类名的旧 prop `selectClassName` / `optionsClassName` **已删除**（不是别名），改用 `classNames` 的 `select` / `panel` 字段。
- 键盘只在**下拉展开期间**接管 `↑` / `↓` / `Enter`（未展开时按方向键不影响组件；展开期间会抢占方向键，与原生 `<select>` 一致）。方向键**跳过 `disabled` 项**、并自动把游标滚进可视区；默认到两端停住，传 `loop` 才环绕。
- 下拉默认**最多同时显示 4 项**（`showOptionEntries` 默认值），超出部分滚动查看 —— 选项数超过 4 个的实例都会受影响。
- 两个箭头是两个开关：`showTriggerArrow` 管**触发器里**那个 chevron，`isShowArrow` 管**浮层气泡上**的小三角。传了 `trigger` 之后两者都不再生效。
- `compare` 一处改、三处生效：选中态判定、游标初始落点、`onActiveChange` 去重共用同一个判据。只改一处会出现「显示选中了 A、游标落在 B」这种自相矛盾的状态。传内联箭头函数是安全的 —— 内部只从 ref 读它、不进任何 effect 依赖（进了的话父组件每次重渲染都会把游标打回原位）。
- `trigger` 与 `children` 是两个不同的槽：`children` 渲染**选项内容**，`trigger` 渲染**触发器**。两者可以同时用（自定义触发器 + 自定义选项）。
- 传了 `trigger` 后，节点会被包进一层 `.ono-select-trigger`（`display: inline-flex`）—— 那层 div 才是浮层的定位参照，也是点击与 `aria-*` 的落点。要撑满父级就在自己的节点上写 `width: 100%`。
- `trigger` 拿到的状态里**没有** `onClick`：在 `OnoSelect` 里开合由 `PopoverBase` 负责（它自己往触发器上挂原生 click 监听），只有 headless 用法才需要自己接 `onClick={select.toggle}`。两处都挂会一次点击切换两遍，表现为「点了没反应」。
- `open` 受控后 `onDropdownVisibleChange` 依然会触发，但必须把它写回 `open`，否则面板不会动 —— 受控组件的老规矩，这里没有特殊豁免。
- `placement` 默认是 `bottom-start`（左下对齐）。因为 `sameWidth` 默认打开（面板与触发器同宽），`bottom` 与 `bottom-start` 视觉上完全一样 —— 想看出方位差异要先关掉 `sameWidth`。
- `dropdownMaxHeight` 给了之后，「一屏几项」由 `floor(高度 / 行高)` 反推，与键盘滚动共用**同一个数**，不会出现「CSS 只画 3 行、JS 以为 5 行」的错位。
- `closeOnEsc` 走的是 `useEscClose` / `useTopModal` 那套「只有最上层响应」的机制（与 Drawer / Dialog 共用一份顺序栈），所以「弹窗里开着下拉，按 `Esc`」只关下拉、不关弹窗。
- 要完全自定义外观时用 [useSelect](/comps/useSelect) + [SelectPanel](/comps/selectPanel)：行为与 `OnoSelect` 是**同一份实现**，不存在两套逻辑各自演化。
- 未开启 `filterOption` 时输入框是只读的（点击会展开下拉，但无法输入）；开启后输入的关键字会在关闭下拉时被清空。
- `clearable` 的清除按钮只在「鼠标悬停且已有选中值」时出现。
- `children` 完全接管选项内部渲染，默认的选中 / 游标修饰类不会自动加；第三参 `isCursor` 可用来自己画游标态。
- `onActiveChange` **只在该值真的变化时触发**：同一项重复上报会被去重，判据是 `Object.is` 比 **value**（不是比索引），所以「过滤前后同一项恰好还落在同一索引」不会误报。挂载时游标就落在首项，因此**首次渲染后会收到一次 `reason: 'auto'`**；面板关闭时游标**不复位、也不通知**，下次打开接着上次的位置。
- `onActiveChange` 在列表为空或过滤无结果时，`value` 与 `option` 都是 `undefined` —— **不是** `''`，`''` 是合法 value。
- 下拉浮层的落点自动跟着触发元素走：默认挂到 `document.body`，触发元素在 Modal / Drawer 里时会挂进该弹窗容器内部（否则会被 top layer / 遮罩盖住）。需要把浮层限制在某个滚动容器内时用 `getPopupContainer`。
- ⚠️ **清空不关面板**：点清除按钮只触发 `onClear`，面板保持展开，因此既不会触发 `onDropdownVisibleChange(false)`、也不会触发 `onCancel`。「取消」的判据只认「本次打开会话内没有确认过」，与清空无关。
- `onCancel` 不只覆盖「点面板外部」：**再次点击触发器收起**同样算取消（只要这次打开期间没确认过）。判断语义请按「open + 期间是否发生过 `onChange`」组合推，别按调用次数猜。
