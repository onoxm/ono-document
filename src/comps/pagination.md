# Pagination 分页
分页器用于分隔长列表，每次只加载一个页面。

## 基础用法
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
      <Pagination
        total={10} //总页数
        currentPage={currentPage} //当前页码
        onChange={setCurrentPage} //页码改变的回调函数
      />
    </div>
  )
}

export default App;
```

## 自定义首页和尾页按钮样式
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
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
              border: '1px solid #e5e5e5'
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
              border: '1px solid #e5e5e5'
            }}
          >
            尾页
          </div>
        }
      />
    </div>
  )
}

export default App;
```

## 自定义页码按钮样式
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
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
  )
}

export default App;
```

## 自定义上一页和下一页按钮样式
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
      <Pagination
        total={10} //总页数
        currentPage={currentPage} //当前页码
        onChange={setCurrentPage} //页码改变的回调函数
        prevBtn={isActive => (
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
        )}
        nextBtn={isActive => (
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
        )}
      />
    </div>
  )
}

export default App;
```

## 当到达首页或尾页时，隐藏上一页或下一页按钮
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
      <Pagination
        total={10} //总页数
        currentPage={currentPage} //当前页码
        onChange={setCurrentPage} //页码改变的回调函数
        hiddenNextBtnOnLastPage //当到达尾页时，隐藏下一页按钮
        hiddenPrevBtnOnFirstPage //当到达首页时，隐藏上一页按钮
      />
    </div>
  )
}

export default App;
```

## 页码折叠
总页数超过 7 时，组件会自动把中间的页码折叠成省略号，并始终保留当前页及其前后各一页。
```tsx
import { useState } from 'react'
import { Pagination } from 'ono-react-element'

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  return (
    <div>
      <Pagination
        total={20} //总页数
        currentPage={currentPage} //当前页码
        onChange={setCurrentPage} //页码改变的回调函数
      />
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
currentPage|当前页码（从 1 开始）|<code>number</code>|-|是
total|总页数（从 1 开始）|<code>number</code>|-|是
onChange|页码改变时触发的回调函数|<code>(page: number) => void</code>|-|是
firstBtn|自定义首页按钮|<code>ReactNode</code>|<code>null</code>|否
lastBtn|自定义尾页按钮|<code>ReactNode</code>|<code>null</code>|否
prevBtn|自定义上一页按钮，传函数时入参为「是否可以上一页」|<code>ReactNode</code>\|<code>(isActive: boolean) => ReactNode</code>|<code>null</code>|否
nextBtn|自定义下一页按钮，传函数时入参为「是否可以下一页」|<code>ReactNode</code>\|<code>(isActive: boolean) => ReactNode</code>|<code>null</code>|否
children|自定义页码按钮的渲染函数|<code>(\{ page, isActive \}: \{ page: number; isActive: boolean \}) => ReactNode</code>|<code>null</code>|否
hiddenPrevBtnOnFirstPage|在第一页时隐藏上一页按钮|<code>boolean</code>|<code>false</code>|否
hiddenNextBtnOnLastPage|在最后一页时隐藏下一页按钮|<code>boolean</code>|<code>false</code>|否
className|自定义类名|<code>string</code>|-|否
styles|自定义样式|<code>CSSProperties</code>|-|否

## 注意事项
- 自定义样式对应的属性名是 `styles`（复数），不是 `style`。
- 总页数不超过 7 时全部页码直接平铺；超过 7 时按当前页所在位置折叠，页码区始终不会只剩下省略号。
- `firstBtn` / `lastBtn` 只在传入时才渲染，未传入时首尾不占位；而上一页 / 下一页按钮默认始终渲染，文案为 `prev` / `next`，需要隐藏请用 `hiddenPrevBtnOnFirstPage` / `hiddenNextBtnOnLastPage`。
- `prevBtn` / `nextBtn` 传函数时，入参 `isActive` 表示「该方向的翻页是否可用」，可直接用来切换禁用态样式。
