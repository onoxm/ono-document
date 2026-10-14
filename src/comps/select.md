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

## 隐藏浮层箭头
`isShowArrow` 控制下拉浮层上那个小三角的显示，输入框右侧的下拉箭头是内置的、始终显示。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]

  return (
    <div style={{ width: '320px' }}>
      <OnoSelect isShowArrow={false} placeholder="请选择" options={options} />
    </div>
  )
}

export default App;
```

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

- `select` → 输入框外层（即 `OnoInput` 的 `.ono-input-wrapper`）
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
`classNames.option` 落在选项**外层**按钮上，所以即使传了 `children` 自定义渲染也照样生效。`styles` 的 `select` 落点与 `OnoInput` 的 `style` 同元素，展开在组件内置的 CSS 变量**之后** —— 因此可以直接覆盖 `--ono-input-border`（前提是先聚焦输入框，让 Input 消费该变量）。

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|选项列表，`T` 由它推断|<code>SelectOption\<T>[]</code>|-|是
defaultValue|初始选中值，类型与 <code>options[].value</code> 同源|<code>T</code>|-|否
placeholder|未选中时的占位文本|<code>string</code>|-|否
isShowArrow|是否显示下拉浮层的箭头|<code>boolean</code>|<code>true</code>|否
inputBorder|选择器输入框的边框|<code>string</code>|-|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
clearable|是否可清除，悬停且已有值时显示清除按钮|<code>boolean</code>|<code>false</code>|否
classNames|三个部件的补充类名|<code>SelectClassNames\<T></code>|-|否
styles|三个部件的补充行内样式，落点与 <code>classNames</code> 一一对应|<code>SelectStyles\<T></code>|-|否
notFoundContent|无匹配项时的内容|<code>ReactNode</code>|<code>'No Data'</code>|否
children|自定义选项渲染，参数为「选项 / 是否选中 / 是否为游标」|<code>(option: SelectOption\<T>, isSelected: boolean, isCursor: boolean) => ReactNode</code>|-|否
filterOption|是否开启搜索，传函数可自定义过滤规则|<code>boolean</code>\|<code>(keyword: string, options: SelectOption\<T>[]) => SelectOption\<T>[]</code>|-|否
showOptionEntries|下拉最多同时显示几项，超出部分滚动查看；传 <code>0</code> 表示不限制|<code>number</code>|<code>4</code>|否
loop|键盘走到两端时是否环绕|<code>boolean</code>|<code>false</code>|否
onClear|清空时触发（点击清除按钮）|<code>() => void</code>|-|否
onChange|**真正选中某一项时**触发，参数为该项的 <code>value</code>|<code>(value: T) => void</code>|-|否
getPopupContainer|下拉浮层的落点解析器，不传则走内置解析链|<code>PopupContainerResolver</code>|-|否

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
- 这是**非受控**组件：只有 `defaultValue` 作为初始值，**没有 `value` 属性**。想同步当前选中值只能用 `onChange` 记录。
- `defaultValue` 是「初始高亮项」与「初始选中项」的依据，仅在 `defaultValue` 变化时同步；选中项的显示文案是从 `options` **实时派生**的 —— `options` 异步后到、或宿主改了同名 `value` 的 `label` 文案，显示与高亮都会自动跟随。
- 「谁被选中」一律按 **`value`** 判等，不是 `label` —— `label` 只是显示文案，可以重复、可以改名、可以异步后到。所以 `label` 相同的选项只会点亮真正选中的那一个，`children` 的 `isSelected` 同理。
- ⚠️ **清空不再回调 `onChange`**，只触发 `onClear`（更早的版本会回调 `onChange('')`）。所以 `onChange` 的参数类型就是干净的 `T`（`number` / 自定义类型不会再收到字符串），代价是清空这条通知要另接 `onClear`。
- `T` 完全由 `options[].value` 推断，对 `string` / `number` 之外的类型同样成立。**别给 `options` 写显式类型注解、也别手写泛型参数**，否则推断会被收窄。
- 选项类名的旧 prop `selectClassName` / `optionsClassName` **已删除**（不是别名），改用 `classNames` 的 `select` / `panel` 字段。
- 键盘只在**下拉展开期间**接管 `↑` / `↓` / `Enter`（未展开时按方向键不影响组件；展开期间会抢占方向键，与原生 `<select>` 一致）。方向键**跳过 `disabled` 项**、并自动把游标滚进可视区；默认到两端停住，传 `loop` 才环绕。
- 下拉默认**最多同时显示 4 项**（`showOptionEntries` 默认值），超出部分滚动查看 —— 选项数超过 4 个的实例都会受影响。
- 输入框上会出现两个箭头相关的元素：**右侧那个箭头是内置的、始终显示**，`isShowArrow` 控制的是下拉浮层上贴着边框的小三角。
- 未开启 `filterOption` 时输入框是只读的（点击会展开下拉，但无法输入）；开启后输入的关键字会在关闭下拉时被清空。
- `clearable` 的清除按钮只在「鼠标悬停且已有选中值」时出现。
- `children` 完全接管选项内部渲染，默认的选中 / 游标修饰类不会自动加；第三参 `isCursor` 可用来自己画游标态。
- 下拉浮层的落点自动跟着触发元素走：默认挂到 `document.body`，触发元素在 Modal / Drawer 里时会挂进该弹窗容器内部（否则会被 top layer / 遮罩盖住）。需要把浮层限制在某个滚动容器内时用 `getPopupContainer`。
