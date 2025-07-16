# AutoSliderList 自动滑块
一个按钮列表组件，点击某个按钮滑块会自动滑到对应的位置。

## 前置条件
该组件依赖`common`里的方法，请先下载<a href='/ono-document/utils/common'>`common`</a>文件至`src/utils`文件夹中。

下载AutoSliderList组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './AutoSliderList';
```

## 基础用法
```tsx
import React, { useState } from'react'
import { AutoSliderList } from '@/components/tools'

function App() {
    const list = [
        'html',
        'css',
        'javascript',
        'typescript',
        'vue',
        'angular',
        'react'
    ]

    return <div>
        <AutoSliderList
            style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
            sliderStyle={{ background: 'pink', borderRadius: 8 }}
            list={list}
            sliderTransitionTimingFunction="linear"
        >
        {({ item, isActive }) => (
            <li
                key={item}
                style={{
                    width: '100%',
                    height: 'fit-content',
                    padding: '4px 8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : '#333'
                }}
            >   
                {item}
            </li>
        )}
      </AutoSliderList>
    </div>
}

export default App;
```

## 使用当前下标属性
```tsx
import React, { useState } from'react'
import { AutoSliderList } from '@/components/tools'

function App() {
    const list = [
        'html',
        'css',
        'javascript',
        'typescript',
        'vue',
        'angular',
        'react'
    ]

    return (
        <AutoSliderList
            list={list}
            style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
            sliderStyle={{ background: 'pink', borderRadius: 8 }}
            currentIndex={list.findIndex(item => item === 'javascript')}
            sliderTransitionTimingFunction="linear"
        >
            {({ item, isActive }) => (
                <li
                    key={item}
                    style={{
                        width: '100%',
                        height: 'fit-content',
                        padding: '4px 8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: isActive ? '#fff' : '#333'
                    }}
                >
                    {item}
                </li>
            )}
        </AutoSliderList>
    )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|列表|<code>T[]</code>|-|是
children|子元素|<code>({item, index, isActive}: {item: T; index: number; isActive: boolean}) => JSX.Element</code>|-|是
className|自定义样式类名|<code>string</code>|-|否
style|自定义样式对象|<code>CSSProperties</code>|-|否
sliderClassName|自定义滑块样式类名|<code>string</code>|-|否
sliderStyle|自定义滑块样式对象|<code>CSSProperties</code>|-|否
sliderBox|滑块|<code>JSX.Element</code>|<code>JSX.Element</code>|否
currentIndex|当前下标|<code>number</code>|<code>0</code>|否
duration|滑块滑动动画时长|<code>number</code>|<code>300</code>|否
direction|方向|<code>Horizontal</code>\|<code>Vertical</code>|<code>Horizontal</code>|否
sliderTransitionTimingFunction|滑块动画效果|<code>string</code>|<code>ease-in-out</code>|否
