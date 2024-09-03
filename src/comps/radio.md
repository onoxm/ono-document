# Radio 单选框
单选框用于在多个选项中选取一个。

## 前置条件
下载Pagination组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './Radio';
```

## 基础用法
```tsx
import React, { useState } from'react'
import { Radio } from '@/components/elements'

function App() {
    const [value, setValue] = useState<string>('vue')

    return <div>
        当前使用框架：{value}
        <Radio
          value={value}
          checked={value === 'react'}
          onChange={() => setValue('react')}
        >
          react
        </Radio>
    </div>
}

export default App;
```

## 多个单选框用法
```tsx
import React, { useState } from'react'
import { RadioGroup } from '@/components/elements'

function App() {
    const [value, setValue] = useState<string>('vue')

    const radioList = [
            {
              text: 'vue',
              value: 'vue'
            },
            {
              text: 'react',
              value: 'react',
            },
            {
              text: 'angular',
              value: 'angular'
            }
          ]

    return <div>
        当前使用框架：{value}
        <RadioGroup
          color="white"
          value={value}
          direction="vertical"
          radioList={radioList}
          onChange={value => setValue(value as string)}
        />
    </div>
}

export default App;
```

## API

### Radio
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|关联 Radio 选项的值|<code>string</code>\|<code>number</code>\|<code>boolean</code>|-|是
checked|指定当前是否选中|<code>boolean</code>|-|是
children|指定当前是否选中|<code>boolean</code>|-|否
color|`label` 文字颜色|<code>string</code>|<code>#333</code>|否
className|`label` 类名|<code>string</code>|-|否
name|Radio 组的名称|<code>string</code>|-|否
radioW|Radio `input`的宽度|<code>number</code>|<code>16</code>|否
radioGap|Radio `input`与`label`之间的间隔|<code>number</code>|<code>4</code>|否
fontSize|`label` 文字大小|<code>number</code>|<code>16</code>|否
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
fontWeight|`label` 文字粗细|<code>number</code>|<code>400</code>|否
position|`label`相对于`input`的位置|<code>left</code>\|<code>right</code>|<code>right</code>|否
hoverColor|鼠标悬浮时`input`的颜色|<code>string</code>|<code>#aea0ec</code>|否
checkedColor|选中时`input`的颜色|<code>string</code>|<code>#532ce1</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|是

### RadioGroup
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|关联 Radio 选项的值|<code>string</code>\|<code>number</code>\|<code>boolean</code>|-|是
radioList|Radio 选项列表|<code>RadioItemType</code>|-|是
direction|Radio 选项列表的排列方向|<code>horizontal</code>\|<code>vertical</code>|<code>horizontal</code>|否
gap|Radio 选项之间的间隔|<code>number</code>|<code>8</code>|否
color|`label` 文字颜色|<code>string</code>|<code>#333</code>|否
className|`label` 类名|<code>string</code>|-|否
name|Radio 组的名称|<code>string</code>|-|否
radioW|Radio `input`的宽度|<code>number</code>|<code>16</code>|否
radioGap|Radio `input`与`label`之间的间隔|<code>number</code>|<code>4</code>|否
fontSize|`label` 文字大小|<code>number</code>|<code>16</code>|否
fontWeight|`label` 文字粗细|<code>number</code>|<code>400</code>|否
labelPosition|`label`相对于`input`的位置|<code>left</code>\|<code>right</code>|<code>right</code>|否
hoverColor|鼠标悬浮时`input`的颜色|<code>string</code>|<code>#aea0ec</code>|否
checkedColor|选中时`input`的颜色|<code>string</code>|<code>#532ce1</code>|否
onChange|当 Radio 的值发送改变时触发|<code>(value: string\|number\|boolean) => void</code>|-|是

### RadioItemType
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|Radio 选项的值|<code>string</code>\|<code>number</code>\|<code>boolean</code>|-|是
text|Radio 选项的文字|<code>string</code>|-|是
disabled|禁用函数|<code>(value: string\|number\|boolean) => boolean</code>|-|否
