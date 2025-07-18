# Radio 单选框
单选框用于在多个选项中选取一个。

## 前置条件
下载Radio组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './Radio';
```

## 单个单选框用法
```tsx
import React, { useState } from'react'
import { Radio } from '@/components/elements'

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
import { RadioGroup } from '@/components/elements'

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
import { RadioGroup } from '@/components/elements'

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
        value={language}
        options={languageList}
        style={{
          flexDirection: 'row-reverse',
          gap: 16,
          fontSize: '24px',
          fontWeight: 700
        }}
        radioStyle={isActive => ({
          width: 24,
          background: isActive ? '#f00' : '#fff'
        })}
        radioGroupStyle={{ gap: 8, flexDirection: 'column' }}
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
className|Radio和label父元素的类名|<code>string</code>|<code>-</code>|否
style|Radio和label父元素的样式|<code>CSSProperties</code>|<code>-</code>|否
radioClassName|Radio和label父元素的类名|<code>string</code>|<code>-</code>|否
radioStyle|Radio和label父元素的样式|<code>CSSProperties</code>|<code>-</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|是

### RadioGroup
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|关联 Radio 选项的值|<code>T</code>|-|是
name|Radio 组的name|<code>string</code>|-|否
options|Radio 选项列表|<code>RadioItemType</code>|-|是
radioGroupClassName|RadioGroup的类名|<code>string</code>|<code>-</code>|否
radioGroupStyle|RadioGroup的样式|<code>CSSProperties</code>|<code>-</code>|否
className|Radio和label父元素的类名|<code>string</code>|<code>-</code>|否
style|Radio和label父元素的样式|<code>CSSProperties</code>|<code>-</code>|否
radioClassName|Radio和label父元素的类名|<code>string</code>|<code>-</code>|否
radioStyle|Radio和label父元素的样式|<code>CSSProperties</code>|<code>-</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(value: T) => void</code>|-|是

### RadioItemType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|Radio 选项的值|<code>T</code>|-|是
label|Radio 选项的文字|<code>string</code>|-|是
disabled|禁用函数|<code>boolean</code>\|<code>(value: string\|number\|boolean) => boolean</code>|-|否
