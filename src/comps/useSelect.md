# useSelect
Select 的行为内核：选中、游标、开合、过滤、键盘、外部点击 —— **一个像素的外观都没有**。

`OnoSelect` 就是「`useSelect` + `PopoverBase` + 内置输入框触发器」拼起来的。需要换整套外观时用它，行为与组件完全一致（同一份实现，不会各演化一套）。

## 基础用法
`getTriggerProps` 挂到触发器上，`getPanelProps` 挂到滚动容器上，`getOptionProps` 逐项取运行时状态。剩下的 DOM 与样式全归你。
```tsx
import { useSelect } from 'ono-react-element'
import { useState } from 'react'

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' }
]

function App() {
  const [value, setValue] = useState<string | null>('shanghai')

  const select = useSelect({
    options,
    value: value ?? undefined,
    onChange: setValue
  })

  const panelProps = select.getPanelProps()

  return (
    <div style={{ width: 320 }}>
      <div
        {...select.getTriggerProps()}
        onClick={select.toggle}
        style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        {select.selectedLabel || '请选择'}
      </div>

      {select.open && (
        <ul
          {...panelProps}
          style={{
            ...panelProps.style,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            overflow: 'auto'
          }}
        >
          {select.filteredOptions.map((option, index) => {
            const item = select.getOptionProps(index)
            return (
              <li
                key={index}
                id={item.id}
                onClick={() => item.onChange(option.value)}
                onMouseMove={item.onCursorMove}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  background: item.isCursor ? '#f3f0ff' : 'transparent',
                  fontWeight: item.isSelected ? 600 : 400
                }}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App;
```

## 配合 SelectPanel
不想自己写列表就用现成的面板 —— [SelectPanel](/comps/selectPanel) 消费同一个 `useSelect` 实例，列表、滚动条、空态、`Esc` 都有了，只剩定位要自己解决。

## 配置
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|选项列表|<code>SelectOption\<T>[]</code>|-|是
value|受控选中值；传了它（<code>!== undefined</code>）就不再自己存值|<code>T</code>|-|否
defaultValue|非受控初始值|<code>T</code>|-|否
compare|选中判定，默认 <code>Object.is</code>；同时决定游标初始落点与 <code>onActiveChange</code> 去重|<code>(a: T, b: T) => boolean</code>|<code>Object.is</code>|否
open|受控开合|<code>boolean</code>|-|否
defaultOpen|非受控初始开合|<code>boolean</code>|<code>false</code>|否
disabled|禁用；为真时 <code>setOpen(true)</code> 会被忽略|<code>boolean</code>|<code>false</code>|否
filterOption|过滤口径：<code>true</code> 走内置（label 不区分大小写的包含匹配），传函数完全接管|<code>SelectFilterOption\<T></code>|-|否
showOptionEntries|一屏最多几项（<code>0</code> = 不限高）|<code>number</code>|<code>4</code>|否
dropdownMaxHeight|面板高度上限（px），给了它之后 <code>showOptionEntries</code> 不再参与算高|<code>number</code>|-|否
loop|键盘走到两端是否环绕|<code>boolean</code>|<code>false</code>|否
closeOnOutsideClick|点击「触发器与面板之外」是否关闭|<code>boolean</code>|<code>true</code>|否
onChange|确认选中某一项时触发|<code>(value: T) => void</code>|-|否
onClear|清空时触发（**不**回调 <code>onChange</code>）|<code>() => void</code>|-|否
onDropdownVisibleChange|面板开合时触发|<code>(open: boolean) => void</code>|-|否
onCancel|面板关闭、且本次打开期间没有确认过时触发|<code>() => void</code>|-|否
onActiveChange|游标变化时触发|<code>SelectOnActiveChange\<T></code>|-|否

## 返回值
参数|说明|类型
:- | :- | :-
open|面板是否展开|<code>boolean</code>
setOpen|唯一的开关入口（触发器 / 确认 / `Esc` / 外部点击都汇到这里），同值自动去重|<code>(open: boolean) => void</code>
toggle|<code>setOpen(!open)</code> 的便捷版|<code>() => void</code>
commit|确认某一项：先 <code>onChange</code>、再关面板|<code>(value: T) => void</code>
clear|清空：只走 <code>onClear</code>，不碰 <code>onChange</code>|<code>() => void</code>
selectedValue|当前确认值；没选中时是 <code>undefined</code>|<code>T</code> \| <code>undefined</code>
selectedOption|确认值对应的选项（<code>options</code> 里找不到时为 <code>undefined</code>）|<code>SelectOption\<T></code> \| <code>undefined</code>
selectedLabel|选中项文案；没选中是空串|<code>string</code>
hasSelection|是否已选中 —— <code>T</code> 允许 <code>undefined</code> 时靠它区分「没选」|<code>boolean</code>
searchValue|当前搜索词|<code>string</code>
setSearchValue|写入搜索词（<code>filterOption</code> 为真时才影响列表）|<code>(value: string) => void</code>
filteredOptions|过滤后的选项|<code>SelectOption\<T>[]</code>
cursorIndex|游标所在索引，<code>-1</code> 表示无|<code>number</code>
moveCursor|按步长移动游标，跳过 <code>disabled</code> 并把新位置滚进可视区|<code>(step: 1 \| -1) => void</code>
hoverCursor|把游标挪到第 n 项（键盘占用期内会被抑制）|<code>(index: number) => void</code>
itemHeight|量到的行高|<code>number</code>
setItemHeight|写入行高（<code>SelectPanel</code> 会自动调）|<code>(height: number) => void</code>
maxHeight|面板该用的高度上限|<code>number</code> \| <code>undefined</code>
listRef|选项滚动容器（也是 <code>scrollToItem</code> 的 element）|<code>RefObject&lt;HTMLDivElement \| null&gt;</code>
panelRootRef|面板最外层（外部点击判定的范围）|<code>RefObject&lt;HTMLDivElement \| null&gt;</code>
getTriggerProps|触发器 props：`ref` / `role` / `aria-*` / 关闭态的按键处理|<code>&lt;E extends HTMLElement = HTMLDivElement&gt;() => SelectTriggerProps&lt;E&gt;</code>
getPanelProps|面板滚动容器 props：`ref` / `role` / `id` / `max-height`|<code>() => SelectPanelInnerProps</code>
getOptionProps|第 n 项的运行时状态：<code>id</code> / <code>isSelected</code> / <code>isCursor</code> / <code>onChange</code> / <code>onCursorMove</code>|<code>(index: number) => SelectOptionRuntimeProps\<T></code>

## 注意事项
- 这是 `ono-react-element` 主包导出的 hook（不在 `@onoxm/react-hooks` 里），从主入口引即可。
- **`getTriggerProps()` 里没有 `onClick`**：`OnoSelect` 那边由 `PopoverBase` 挂原生 click 监听，headless 场景必须自己接 `onClick={select.toggle}`。两处都挂会一次点击切换两遍，表现为「点了没反应」。
- `getTriggerProps<E>()` 的泛型要跟落点走：触发器换成 `<button>` 就写 `getTriggerProps<HTMLButtonElement>()` —— ref 的类型必须匹配，否则 `RefObject<HTMLDivElement>` 赋不给 button 的 ref。
- 悬停请挂 **`onMouseMove`**（对应 `onCursorMove`），不要用 `onMouseEnter`：滚动把另一项送到静止的指针下方时，浏览器会补发 `mouseover` / `mouseenter`（**没有** `mousemove`），那会让键盘刚挪上去的游标被拽回来，症状是「列表滚到某一项后跳回去」。
- 键盘监听挂在 `window` 上（不是触发器），`↑` / `↓` / `Enter` 只在**面板展开期间**接管，`Enter` 会 `preventDefault` —— 触发器里是 `<input>` 时，不挡掉就会顺手提交表单。
- 指针拖动游标还有第二道闸门：**按下方向键后的 300ms 内**，鼠标移动不再改写游标。1px 抖动与 1px 有意移动在事件层面分不出来，只能按「此刻是谁在操作」让位。代价是键盘操作后 300ms 内鼠标悬停不跟随（点击选中不受影响）。
- `compare` 传内联箭头函数是安全的：内部只从 ref 读它、不进任何 effect 依赖。进了的话父组件每次重渲染都会把游标打回原位，看起来像「方向键按一下跳一下」。
- 受控 `value` 的判据是 `!== undefined` —— 不能用它表达「清空」。清空要走 `clear()`（或自己 `onClear` 里置空外部 state），此时把 `value` 传成 `undefined` 会让 hook 切回非受控、读自己那份内部值。
- 套在自带外部点击关闭的浮层里（本库的 `PopoverBase` 就是）时必须传 `closeOnOutsideClick: false` —— 两份监听会让「关闭」与浮层自己的 toggle 语义打架。`OnoSelect` 内部就是这么传的。
- 面板关闭时游标**不复位、也不通知**，下次打开接着上次的位置；`onActiveChange` 在挂载时会报一次 `reason: 'auto'`（游标自动落到首项），做「用户正在浏览」的埋点要排除它。
