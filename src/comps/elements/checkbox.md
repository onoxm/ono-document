# Checkbox 多选框
收集用户的多项选择。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/Checkbox.css'
```

## 基础用法
```tsx
import React, { useState } from'react'
import { Checkbox } from 'ono-react-element'

function App() {
    const [checked, setChecked] = useState(false)

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          id="my_checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <label htmlFor="my_checkbox">
          当前状态：{checked ? '选中' : '未选中'}
        </label>
      </div>
    )
}

export default App;
```

## 多选用法
```tsx
import React, { useState } from'react'
import { Checkbox } from 'ono-react-element'

function App() {
  const [allChecked, setAllChecked] = useState(false)
  const [html, setHtml] = useState(false)
  const [css, setCss] = useState(false)
  const [javascript, setJavascript] = useState(false)

  const checkList = [
    {
      label: 'HTML',
      checked: html,
      color: '#e65100',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setHtml(e.target.checked)
    },
    {
      label: 'CSS',
      checked: css,
      color: '#42a5f5',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCss(e.target.checked)
    },
    {
      label: 'JavaScript',
      checked: javascript,
      color: '#ffca28',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setJavascript(e.target.checked)
    }
  ]

  const handleIndeterminate = () => {
    const arr = [html, css, javascript]
    if (arr.every(item => item)) return false
    else return arr.some(item => item)
  }

  useEffect(() => {
    if (html && css && javascript) setAllChecked(true)
    else setAllChecked(false)
  }, [html, css, javascript])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          id="checkbox_all"
          style={{
            width: '1rem',
            border: `1px solid ${
              allChecked
                ? '#A78BFA'
                : handleIndeterminate()
                ? '#A78BFA'
                : '#333'
            }`
          }}
          checkedColor="#A78BFA"
          indeterminate={handleIndeterminate()}
          indeterminateColor="#A78BFA"
          checked={allChecked}
          onChange={() => {
            if (allChecked) {
              setHtml(false)
              setCss(false)
              setJavascript(false)
            } else {
              setHtml(true)
              setCss(true)
              setJavascript(true)
            }
          }}
        />
        <label htmlFor="checkbox_all">全选</label>
        <p>({(html ? 1 : 0) + (css ? 1 : 0) + (javascript ? 1 : 0)} / 3)</p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <List list={checkList}>
          {({ checked, label, color, onChange }) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Checkbox
                id={`checkbox_${label}`}
                style={{
                  width: '1rem',
                  border: `1px solid ${checked ? color : '#333'}`
                }}
                checkedColor={color}
                checked={checked}
                onChange={onChange}
              />
              <label htmlFor={`checkbox_${label}`}>{label}</label>
            </div>
          )}
        </List>
      </div>
    </>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|Checkbox的id|<code>string</code>|-|否
checked|Checkbox是否选中|<code>boolean</code>|-|是
className|Checkbox的className|<code>string</code>|-|否
style|Checkbox的style|<code>CSSProperties</code>|-|否
indeterminate|Checkbox的中间状态|<code>boolean</code>|<code>false</code>|否
indeterminateColor|Checkbox的中间状态颜色|<code>string</code>|-|否
indeterminateStyle|Checkbox的中间状态样式|<code>'line'</code>\|<code>'lborder'</code>|<code>'line'</code>|否
onChange|Checkbox的change事件回调函数|<code>(e: ChangeEvent\<HTMLInputElement>) => void</code>|-|是
