# Switch 开关
使用开关切换两种状态之间。

## 前置条件
该组件依赖`common`里的方法，请先下载<a href='/ono-document/utils/common'>`common`</a>文件至`src/utils`文件夹中。

下载Pagination组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/elements/index.ts`写入以下代码
```tsx
export * from './Switch';
```

## 基础用法
```tsx
import React, { useState } from'react'
import { Switch } from '@/components/elements'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        checked={checked}
        onChange={bl => setChecked(bl)}
      />
    </div>
  )
}

export default App;
```

## 自定义文本
```tsx
import React, { useState } from'react'
import { Switch } from '@/components/elements'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        style={{ width: 60, height: 24 }}
        checked={checked}
        onChange={(value) => setChecked(value)}
        text={{
          active: <span className="text-white">开</span>,
          inactive: <span>关</span>
        }}
      />
    </div>
  )
}

export default App;
```

## 自定义开关颜色
```tsx
import React, { useState } from'react'
import { Switch } from '@/components/elements'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ width: '100%' }}>
      <Switch
        style={{ width: 48, height: 24 }}
        checked={checked}
        onChange={(value) => setChecked(value)}
        color={{ active: 'blue', inactive: 'red' }}
      />
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|Switch组件id|<code>string</code>|-|否
name|Switch组件name|<code>string</code>|-|否
checked|Switch是否为打开状态|<code>boolean</code>|-|是
disabled|是否禁用|<code>boolean</code>|<code>false</code>|否
className|Switch组件的类名|<code>string</code>|<code>-</code>|否
style|Switch组件的样式|<code>CSSProperties</code>|<code>-</code>|否
text|Switch组件上显示的文字|<code>{ active: ReactNode; inactive: ReactNode }</code>|<code>-</code>|否
color|Switch组件的颜色|<code>string</code>\|<code>{ active: string; inactive: string }</code>|<code>-</code>|否
onChange|当Switch组件状态改变时触发的回调|<code>(bl: boolean, e: React.ChangeEvent\<HTMLInputElement>) => void</code>|-|否
