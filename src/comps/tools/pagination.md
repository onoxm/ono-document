# Pagination 分页
分页器用于分隔长列表，每次只加载一个页面。

## 前置条件
下载Pagination组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './Pagination';
```

## 基础用法
```tsx
import React, { useState } from'react'
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <div>
        <Pagination
            total={10} //总页数
            currentPage={currentPage} //当前页码
            onChange={setCurrentPage} //页码改变的回调函数
        />
    </div>
}

export default App;
```

## 自定义首页和尾页按钮样式
```tsx
import React, { useState } from'react'
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <div>
        <Pagination
            total={10} //总页数
            currentPage={currentPage} //当前页码
            onChange={setCurrentPage} //页码改变的回调函数
            firstBtn={
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                    }}
                >
                    首页
                </div>
            }
            lastBtn={
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                    }}
                >
                    尾页
                </div>
            }
        />
    </div>
}

export default App;
```
## 自定义页码按钮样式
```tsx
import React, { useState } from'react'
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <div>
        <Pagination
            total={10} //总页数
            currentPage={currentPage} //当前页码
            onChange={setCurrentPage} //页码改变的回调函数
        >
            {({ page, isActive }) => (
                <div
                    style={{
                        width: '40px',
                        display: 'flex',
                        aspectRatio: '1',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #e5e5e5',
                        color: isActive ? 'white' : '#333',
                        backgroundColor: isActive ? '#765def' : 'white'
                    }}
                >
                    {page}
                </div>
            )}
        </Pagination>
    </div>
}

export default App;
```

## 自定义上一页和下一页按钮样式
```tsx
import React, { useState } from'react'
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <div>
        <Pagination
            total={10} //总页数
            currentPage={currentPage} //当前页码
            onChange={setCurrentPage} //页码改变的回调函数
            prevBtn={(isActive) =>
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                        opacity: isActive ? 1 : 0.5
                    }}
                >
                    上一页
                </div>
            }
            nextBtn={(isActive) =>
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                        opacity: isActive ? 1 : 0.5
                    }}
                >
                    下一页
                </div>
            }
        />
    </div>
}

export default App;
```

## 当到达首页或尾页时，禁用上一页或下一页按钮
```tsx
import React, { useState } from'react'
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <div>
        <Pagination
            total={10} //总页数
            currentPage={currentPage} //当前页码
            onChange={setCurrentPage} //页码改变的回调函数
            hiddenNextBtnOnLastPage //当到达尾页时，隐藏下一页按钮
            hiddenPrevBtnOnFirstPage //当到达首页时，隐藏上一页按钮
        />
    </div>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
total|总页数|<code>number</code>|-|是
currentPage|当前页码|<code>number</code>|-|是
onChange|页码改变的回调函数|<code>(page: number) => void</code>|-|是
hiddenNextBtnOnLastPage|当到达尾页时，隐藏下一页按钮|<code>boolean</code>|<code>false</code>|否
hiddenPrevBtnOnFirstPage|当到达首页时，隐藏上一页按钮|<code>boolean</code>|<code>false</code>|否
firstBtn|自定义首页按钮|<code>ReactNode</code>|<code>null</code>|否
lastBtn|自定义尾页按钮|<code>ReactNode</code>|<code>null</code>|否
prevBtn|自定义上一页按钮|<code>ReactNode | (isActive: boolean) => ReactNode</code>|<code>null</code>|否
nextBtn|自定义下一页按钮|<code>ReactNode | (isActive: boolean) => ReactNode</code>|<code>null</code>|否
children|自定义页码按钮|<code>({page, isActive}: {page: number; isActive: boolean}) => ReactNode</code>|<code>null</code>|否
