# Pagination 分页
分页器用于分隔长列表，每次只加载一个页面。

## 前置条件
下载Modal组件文件,并将文件放入src/components/tools文件夹下。

在src/components/tools/index.ts写入以下代码
```tsx
export * from './Pagination';
```

## 基础用法
```tsx
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState(1)

    return <div>
        <Pagination
            allPages={10} //总页数
            currentPage={currentPage} //当前页码
            setCurrentPage={setCurrentPage} //设置当前页码的回调函数
        />
    </div>
}
```

## 自定义首页和尾页按钮样式
```tsx
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState(1)

    return <div>
        <Pagination
            allPages={10} //总页数
            currentPage={currentPage} //当前页码
            setCurrentPage={setCurrentPage} //设置当前页码的回调函数
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
```

## 自定义上一页和下一页按钮样式
```tsx
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState(1)

    return <div>
        <Pagination
            allPages={10} //总页数
            currentPage={currentPage} //当前页码
            setCurrentPage={setCurrentPage} //设置当前页码的回调函数
            prevBtn={
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                    }}
                >
                    上一页
                </div>
            }
            nextBtn={
                <div
                    style={{
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e5e5',
                    }}
                >
                    下一页
                </div>
            }
        />
    </div>
}
```

## 当到达首页或尾页时，禁用上一页或下一页按钮
```tsx
import { Pagination } from '@/components/tools'

function App() {
    const [currentPage, setCurrentPage] = useState(1)

    return <div>
        <Pagination
            allPages={10} //总页数
            currentPage={currentPage} //当前页码
            setCurrentPage={setCurrentPage} //设置当前页码的回调函数
            hiddenNextBtnOnLastPage //当到达尾页时，隐藏下一页按钮
            hiddenPrevBtnOnFirstPage //当到达首页时，隐藏上一页按钮
        />
    </div>
}
```

## API
通用属性参考：通用属性
  参数|说明|类型|默认值|是否必填
  :- | :- | :- | :- | :-
  allPages|总页数|number||是
  currentPage|当前页码|number||是
  setCurrentPage|设置当前页码的回调函数|(page: number) => void||是
  hiddenNextBtnOnLastPage|当到达尾页时，隐藏下一页按钮|boolean|false|否
  hiddenPrevBtnOnFirstPage|当到达首页时，隐藏上一页按钮|boolean|false|否
  firstBtn|自定义首页按钮|ReactNode|null|否
  lastBtn|自定义尾页按钮|ReactNode|null|否
  prevBtn|自定义上一页按钮|ReactNode|null|否
  nextBtn|自定义下一页按钮|ReactNode|null|否
