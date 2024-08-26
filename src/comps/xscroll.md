# Xscroll
一个可滚动组件，纵向滚动时，组件会横向滚动。

## 前置条件
该hooks依赖于`useGetElementSize`，需要先下载 <a href='/ono-document/hooks/useGetElementSize'>useGetElementSize</a> 文件至`src/hooks`文件夹中。

下载Xscroll组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Xscroll';
```

<!-- ## 基础用法
```tsx
import React, { useState } from'react'
import { Xscroll } from '@/components/tools'

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

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|区域子元素|<code>ReactNode</code>|-|是
gap|元素间距|<code>number</code>|<code>0</code>|否
