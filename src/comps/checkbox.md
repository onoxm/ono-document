# Checkbox 多选框
收集用户的多项选择。

## 前置条件
下载Checkbox组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './Checkbox';
```

## 基础用法
```tsx
import React, { useState } from'react'
import { Checkbox } from '@/components/elements'

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
import { Checkbox } from '@/components/elements'

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

    useEffect(() => {
        if (html && css && javascript) setAllChecked(true)
        else setAllChecked(false)
    }, [html, css, javascript])

    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            id="checkbox_all"
            w="1rem"
            border={`1px solid ${allChecked ? '#A78BFA' : '#333'}`}
            bgColor="#A78BFA"
            indeterminate={{
              onChange: checkbox => {
                if (!checkbox) return
                if (html && css && javascript) checkbox.indeterminate = false
                else if (html || css || javascript)
                  checkbox.indeterminate = html || css || javascript
                else checkbox.indeterminate = false
              },
              deps: [html, css, javascript]
            }}
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
                  w="1rem"
                  id={`checkbox_${label}`}
                  border={`1px  solid ${checked ? color : '#333'}`}
                  bgColor={color}
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
w|Checkbox的宽度|<code>string</code>\|<code>number</code>|<code>'20px'</code>|否
checked|Checkbox是否选中|<code>boolean</code>|-|是
onChange|Checkbox的change事件回调函数|<code>(e: ChangeEvent\<HTMLInputElement>) => void</code>|-|是
borderRadius|Checkbox的圆角|<code>string</code>\|<code>number</code>|<code>0</code>|否
indeterminateColor|Checkbox的中间状态颜色|<code>string</code>|-|否
bgColor|Checkbox的选中时的颜色|<code>string</code>|<code>'#0077cc'</code>|否
border|Checkbox的边框|<code>string</code>|<code>'1px solid #333'</code>|否
indeterminate|Checkbox的中间状态|<code>CheckboxIndeterminateType</code>|<code>{ onChange: () => {}, deps: [] }</code>|否

### CheckboxIndeterminateType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onChange|Checkbox的中间状态change事件回调函数|<code>(element: HTMLInputElement) => void</code>|<code>() => {}</code>|否
deps|Checkbox的中间状态change事件依赖项|<code>DependencyList</code>|<code>[]</code>|否
