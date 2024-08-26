# Card3D
Card3D组件是基于React的卡片组件，可以实现3D效果。

## 前置条件
下载Card3D组件文件,并将文件放入`src/components/elements`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './AutoSliderList';
```

<!-- ## 基础用法
```tsx
import React, { useState } from'react'
import { AutoSliderList } from '@/components/tools'

function App() {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const list = [
        'html',
        'css',
        'javascript',
        'typescript',
        'vue',
        'angular',
        'react',
        'node',
        'express',
        'koa',
        'egg',
        'nest',
        'next',
        'nuxt',
        'jquery',
        'backbone',
        'rust',
        'go',
        'python',
        'ruby',
        'php',
        'java',
        'c++',
        'c#'
    ]

    return <div>
        <AutoSliderList
            gap={8}
            padding={8}
            sliderBgc="pink"
            sliderBorderRadius={8}
            border="2px dashed #ccc"
            currentIndex={currentIndex}
            sliderTransitionTimingFunction="linear"
        >
            {list.map((item, i) => (
                <li // 子元素推荐使用li标签
                    key={i}
                    style={{
                        width: '100%',
                        height: 'fit-content',
                        padding: '4px 8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: currentIndex === i ? '#fff' : '#333',
                    }}
                    onClick={() => setCurrentIndex(i)}
                >
                    {item}
                </li>
            ))}
      </AutoSliderList>
    </div>
}

export default App;
``` -->

<!-- ## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
w|宽度|<code>number</code>|<code>300</code>|否
padding|区域内边距|<code>number</code>|<code>0</code>|否
border|区域外边框|<code>string</code>|<code>null</code>|否
borderRadius|区域外边框圆角|<code>number</code>|<code>0</code>|否
duration|滑块滑动动画时长|<code>number</code>|<code>300</code>|否
children|区域子元素|<code>ReactNode</code>|-|是
currentIndex|当前索引|<code>number</code>|-|是
sliderBgc|滑块背景色|<code>string</code>|<code>#ccc</code>|否
sliderWidth|滑块宽度|<code>number</code>|-|否
sliderHeight|滑块高度|<code>number</code>|-|否
sliderBorderRadius|滑块圆角|<code>number</code>|<code>0</code>|否
direction|方向|'Horizontal' | 'Vertical'|<code>Horizontal</code>|否
sliderTransitionTimingFunction|滑块动画效果|<code>string</code>|<code>ease-in-out</code>|否 -->
