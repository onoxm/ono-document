# Radio 单选框
单选框用于在多个选项中选取一个。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/Radio.css'
```

## 单个单选框用法
```tsx
import React, { useState } from'react'
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
```tsx
import React, { useState } from'react'
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

## 自定义多个单选框用法
```tsx
import React, { useState } from'react'
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
        checkedColor="#f00"
        unCheckedColor="#fff"
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

## API

### Radio
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|关联 Radio 选项的值|<code>T</code>|-|是
name|Radio 组的name|<code>string</code>|-|否
checked|指定当前是否选中|<code>boolean</code>|-|是
children|label中显示的文字|<code>boolean</code>|-|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
radioW|Radio的宽度|<code>string</code>\|<code>number</code>|<code>16</code>|否
radioGap|Radio和label之间的gap|<code>string</code>\|<code>number</code>|<code>4</code>|否
className|Radio和label父元素的类名|<code>string</code>|<code>-</code>|否
style|Radio和label父元素的样式|<code>CSSProperties</code>|<code>-</code>|否
checkColor|Radio选中时的颜色|<code>string</code>|<code>'#532ce1'</code>|否
unCheckColor|Radio未选中时的颜色|<code>string</code>|<code>'transparent'</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|是

### RadioGroup
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|关联 Radio 选项的值|<code>T</code>|-|是
name|Radio 组的name|<code>string</code>|-|否
options|Radio 选项列表|<code>RadioItemType</code>|-|是
radioW|Radio的宽度|<code>string</code>\|<code>number</code>|<code>16</code>|否
radioGap|Radio和label之间的gap|<code>string</code>\|<code>number</code>|<code>4</code>|否
style|RadioGroup的样式|<code>CSSProperties</code>|<code>-</code>|否
className|RadioGroup的样式的类名|<code>string</code>|<code>-</code>|否
checkColor|Radio选中时的颜色|<code>string</code>|<code>'#532ce1'</code>|否
unCheckColor|Radio未选中时的颜色|<code>string</code>|<code>'transparent'</code>|否
labelPosition|Radio的标签位置|<code>'left'</code>\|<code>'right'</code>|<code>'left'</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(value: T) => void</code>|-|是

### RadioItemType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|Radio 选项的值|<code>T</code>|-|是
label|Radio 选项的文字|<code>string</code>|-|是
disabled|禁用函数|<code>boolean</code>\|<code>(value: string\|number\|boolean) => boolean</code>|-|否
