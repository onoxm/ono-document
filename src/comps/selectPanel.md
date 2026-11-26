# SelectPanel 选择面板
`useSelect` 的配套面板：列表、滚动条、空态、`Esc` 关闭，**不含触发器与浮层定位**。

它是 `OnoSelect` 内部用的同一个面板 —— 不是另一套实现，所以键盘、游标、滚动行为完全一致。

## 基础用法
自己渲染触发器，用 `useSelect` 管行为，`SelectPanel` 出面板。定位由调用方负责（这里用一层绝对定位的容器）。

```tsx
import { SelectPanel, useSelect } from 'ono-react-element'
import { useState } from 'react'

const options = [
  { label: 'GPT-4o', value: 'gpt-4o' },
  { label: 'Claude 3.7', value: 'claude-3-7' },
  { label: 'DeepSeek V4', value: 'deepseek-v4' }
]

function App() {
  const [value, setValue] = useState<string | null>('gpt-4o')

  const select = useSelect({
    options,
    value: value ?? undefined,
    onChange: setValue
  })

  return (
    <div style={{ width: 320, position: 'relative' }}>
      <div
        {...select.getTriggerProps()}
        onClick={select.toggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 12px',
          border: '1px solid #d6ccff',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        <span>{select.selectedLabel || '选择模型'}</span>
        <span>{select.open ? '▴' : '▾'}</span>
      </div>

      {select.open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: 1000
          }}
        >
          <SelectPanel select={select} />
        </div>
      )}
    </div>
  )
}

export default App;
```

## 自定义选项内容
`children` 与 `OnoSelect` 的同名渲染器参数一致：选项自身、是否选中、是否为游标。
```tsx
import { SelectPanel, useSelect } from 'ono-react-element'

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' }
]

function App() {
  const select = useSelect({ options, defaultValue: 'shanghai' })

  return (
    <div style={{ width: 320, position: 'relative' }}>
      <button
        {...select.getTriggerProps<HTMLButtonElement>()}
        onClick={select.toggle}
      >
        {select.selectedLabel || '请选择'}
      </button>

      {select.open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: 1000
          }}
        >
          <SelectPanel select={select}>
            {(option, isSelected, isCursor) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.label}</span>
                <span>{isSelected ? '✓' : isCursor ? '›' : ''}</span>
              </div>
            )}
          </SelectPanel>
        </div>
      )}
    </div>
  )
}

export default App;
```

触发器换成 `<button>` 时记得把泛型一起改（`getTriggerProps<HTMLButtonElement>()`）—— `ref` 的类型必须跟着落点走，否则 `RefObject<HTMLDivElement>` 赋不给 button 的 ref，TS 会拦下来。

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
select|<code>useSelect</code> 的返回值，面板只消费它、自己不存任何状态|<code>UseSelectReturn\<T></code>|-|是
children|选项内容渲染器，参数为「选项 / 是否选中 / 是否为游标」|<code>(option: SelectOption\<T>, isSelected: boolean, isCursor: boolean) => ReactNode</code>|-|否
classNames|补充类名。**只有 `option` 生效**（`select` 属于触发器、`panel` 属于外层浮层容器）|<code>SelectClassNames\<T></code>|-|否
styles|补充行内样式，落点同 <code>classNames</code>|<code>SelectStyles\<T></code>|-|否
notFoundContent|无匹配项时的内容|<code>ReactNode</code>|<code>'No Data'</code>|否
closeOnEsc|面板打开时按 `Esc` 是否关闭|<code>boolean</code>|<code>true</code>|否

## 注意事项
- **只出面板，不做定位**：`SelectPanel` 渲染的是 `.ono-select-option-wrapper` → `.ono-select-option-list`，没有浮层、没有 popper。要浮在触发器下方得自己包一层定位容器，或者直接用 `OnoSelect`。
- `select` 必须是**同一个** `useSelect` 实例的返回值 —— 面板不持有任何状态，游标、过滤结果、开合全从它读。
- `classNames.panel` / `styles.panel` 在这里**不生效**：面板容器的类名与宽度在 `OnoSelect` 里是由外层浮层（`PopoverBase`）承担的。想改面板外观，请给 `.ono-select-option-wrapper` / `.ono-select-option-list` 写 CSS。
- `Esc` 层只在 `open` 为真时才挂载。**常驻挂载会出错**：`useTopModal` 是「挂载即注册」，一个关着的下拉会参与层级排序，于是弹窗里的 `Esc` 以为上面还有一层、不敢关。
- 选项过滤后滚动条会主动重算：内容高度变了但容器高度没变，`ResizeObserver` 看不见这种变化，得由面板显式通知。
- 面板高度由 `useSelect` 的 `maxHeight` 决定（`dropdownMaxHeight` 优先，否则 `行高 × showOptionEntries`），以 `max-height` 形式写在滚动容器上。
