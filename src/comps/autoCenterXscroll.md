# AutoCenterXscroll
一个元素列表组件，点击某个元素， 该元素会自动滑动到列表组件的中间位置。

## 前置条件
下载AutoSliderList组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './AutoCenterXscroll';
```

## 基础用法
```tsx
import React, { useState } from'react';
import { AutoCenterXscroll } from '@/components/tools';

function App() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    return <div style={{ width: '320px', height: '40px' }}>
        <AutoCenterXscroll gap={4} currentIndex={currentIndex}>
          {list.map((item, i) => (
            <li // 子元素推荐使用li标签
              key={i}
              style={{
                width: 'fit-content',
                height: 'fit-content',
                padding: '4px 8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'white',
                background: 'rgb(71 85 105)',
              }}
              onClick={() => setCurrentIndex(i)}
            >
              {item}
            </li>
          ))}
        </AutoCenterXscroll>
    </div>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
w|组件宽度|<code>number</code>|<code>string</code>|<code>100%</code>|否
gap|元素间距|<code>number</code>|<code>0</code>|否
boxShadow|元素阴影|<code>string</code>|<code>none</code>|否
border|区域外边框|<code>string</code>|<code>null</code>|否
borderTop|区域上边框|<code>string</code>|<code>none</code>|否
borderRight|区域右边框|<code>string</code>|<code>none</code>|否
borderBottom|区域下边框|<code>string</code>|<code>none</code>|否
borderLeft|区域左边框|<code>string</code>|<code>none</code>|否
currentIndex|当前元素索引|<code>number</code>|-|是
children|子元素列表|<code>ReactNode[]</code>|-|是
