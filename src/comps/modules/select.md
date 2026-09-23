# Select 下拉选择
下拉选择器，从一组选项中选择一个值，支持搜索过滤与自定义选项渲染。

## 基础用法
`defaultValue` 作为初始选中值，`onChange` 拿到的是选项的 `value`。
```tsx
import { OnoSelect } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('1')

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true }
  ]

  return (
    <div style={{ width: '500px' }}>
      <div>当前选中：{value}</div>
      <OnoSelect
        defaultValue="2"
        placeholder="请选择"
        options={options}
        onChange={value => setValue(value)}
      />
    </div>
  )
}

export default App;
```

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
    <div style={{ width: '500px' }}>
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
    <div style={{ width: '500px' }}>
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
    <div style={{ width: '500px' }}>
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
    <div style={{ width: '500px' }}>
      <OnoSelect isShowArrow={false} placeholder="请选择" options={options} />
    </div>
  )
}

export default App;
```

## 自定义选项渲染
`children` 是一个渲染函数，第二个参数表示该项是否为当前选中项。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  return (
    <div style={{ width: '500px' }}>
      <OnoSelect placeholder="请选择" options={options}>
        {(option, isSelected) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{option.label}</span>
            {isSelected && <span>✓</span>}
          </div>
        )}
      </OnoSelect>
    </div>
  )
}

export default App;
```

## 无匹配数据
`notFoundContent` 用于自定义「没有选项」时的展示，默认为 `No Data`。
```tsx
import { OnoSelect } from 'ono-react-element'

function App() {
  return (
    <div style={{ width: '500px' }}>
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
    <div style={{ width: '500px' }}>
      <OnoSelect disabled placeholder="不可选择" options={options} />
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|选项列表|<code>SelectOption\<T>[]</code>|-|是
defaultValue|初始选中值，仅作为初始值使用|<code>string</code>\|<code>number</code>|-|否
placeholder|未选中时的占位文本|<code>string</code>|-|否
filterOption|是否开启搜索，传函数可自定义过滤规则|<code>boolean</code>\|<code>(keyword: string, options: SelectOption\<T>[]) => SelectOption\<T>[]</code>|-|否
clearable|是否可清除，悬停且已有值时显示清除按钮|<code>boolean</code>|<code>false</code>|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
isShowArrow|是否显示下拉浮层的箭头|<code>boolean</code>|<code>true</code>|否
inputBorder|选择器输入框的边框|<code>string</code>|-|否
selectClassName|选择器输入框的类名|<code>string</code>|-|否
optionsClassName|下拉面板的类名|<code>string</code>|-|否
notFoundContent|无匹配项时的内容|<code>ReactNode</code>|<code>'No Data'</code>|否
children|自定义选项渲染，第二个参数为是否选中|<code>(option: SelectOption\<T>, isSelected: boolean) => ReactNode</code>|-|否
onClear|点击清除按钮时触发|<code>() => void</code>|-|否
onChange|选中值改变时触发|<code>(value: T) => void</code>|-|否

### SelectOption
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
label|选项显示文本|<code>string</code>|-|是
value|选项的值|<code>string</code>\|<code>number</code>|-|是
disabled|是否禁用该选项|<code>boolean</code>|<code>false</code>|否

## 注意事项
- 组件导出的名字是 **`OnoSelect`**，不是 `Select`。
- 这是**非受控**组件：只有 `defaultValue` 作为初始值，**没有 `value` 属性**。要想让别处显示当前选中的值，需要自己用 `onChange` 记录。
- `defaultValue` 同时也是「初始高亮项」和「初始选中项」的依据，`onChange` 触发后组件内部才会更新显示文本。
- 输入框上会出现两个箭头相关的元素：**右侧那个箭头是内置的、始终显示**，`isShowArrow` 控制的是下拉浮层上贴着边框的小三角。
- 未开启 `filterOption` 时输入框是只读的（点击会展开下拉，但无法输入）；开启后输入的关键字会在关闭下拉时被清空。
- `clearable` 的清除按钮只在「鼠标悬停且已有选中值」时出现；点击清除会同时触发 `onClear` 和 `onChange('')`。
- `children` 里的 `isSelected` 是按 **`label`** 与当前选中项比较得出的，如果两个选项的 `label` 相同会同时被判为选中。
- 下拉浮层挂在 `body` 上，`selectClassName` 作用在输入框、`optionsClassName` 作用在浮层容器；浮层的边框颜色、宽度对齐等由组件内部固定，未对外开放。
