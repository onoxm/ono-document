# AwaitList 异步列表循环
异步获取数组，并将其每一项循环渲染到页面上，加载期间显示 `fallback`。

## 基础用法
用 `fallback` 兼作加载占位，是最常见的用法。
```tsx
import { AwaitList, List, colorUtils } from 'ono-react-element'

function App() {
  const createDataSource = (num: number) => {
    const arr = []
    for (let i = 0; i < num; i++) {
      const clr = colorUtils.randomColor()
      arr.push({
        id: i,
        data: (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              height: i % 2 === 0 ? '80px' : '120px',
              lineHeight: i % 2 === 0 ? '80px' : '120px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: clr,
              color: colorUtils.getContrastColor(clr)!
            }}
          >
            序号：{i + 1} 高度：{i % 2 === 0 ? '80' : '120'}px
          </div>
        )
      })
    }
    return arr
  }

  return (
    <div style={{ width: '500px', height: '800px', overflow: 'auto' }}>
      <AwaitList
        list={() =>
          new Promise<
            {
              id: number
              data: JSX.Element
            }[]
          >(resolve => setTimeout(() => resolve(createDataSource(20)), 1000))
        }
        fallback={
          <List list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}>
            {data => <div key={data}>Loading...</div>}
          </List>
        }
      >
        {data => (
          <div key={data.id} style={{ width: '100%' }}>
            {data.data}
          </div>
        )}
      </AwaitList>
    </div>
  )
}

export default App;
```

## 依赖变化时重新获取
`deps` 变化时会重新执行一次 `list`，适合按查询条件刷新数据。
```tsx
import { useState } from 'react'
import { AwaitList, Button } from 'ono-react-element'

function App() {
  const [page, setPage] = useState(1)

  const fetchList = (page: number) =>
    new Promise<string[]>(resolve =>
      setTimeout(() => resolve([`第 ${page} 页 - 1`, `第 ${page} 页 - 2`]), 800)
    )

  return (
    <div style={{ width: '500px' }}>
      <Button onClick={() => setPage(page + 1)}>加载下一页</Button>
      <AwaitList
        list={() => fetchList(page)}
        deps={[page]}
        fallback={<div>Loading...</div>}
      >
        {(item, i) => <div key={i}>{item}</div>}
      </AwaitList>
    </div>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|需要循环的数组，或返回数组 / Promise 的函数|<code>T[]</code>\|<code>() => T[]</code>\|<code>() => Promise\<T[]></code>|-|是
children|子元素渲染函数|<code>(item: T, index: number) => ReactNode</code>|-|是
fallback|加载中 / 数组为空时显示的元素|<code>ReactNode</code>\|<code>ReactNode[]</code>|-|否
insertBetweenDom|在每两个列表项之间插入的元素|<code>(i: number) => ReactNode</code>|-|否
deps|依赖项数组，变化时重新执行 <code>list</code>|<code>DependencyList</code>|<code>[]</code>|否

## 注意事项
- `fallback` **同时承担「加载中」和「数据为空」两种状态**：请求发出前就会先渲染它，所以通常把它写成骨架屏或 `Loading...`。
- 默认 `deps` 为 `[]`，即只在挂载时获取一次；需要按条件重新请求时显式传 `deps`。
- 与 `List` 一致：`children` 返回 `null` / `undefined` / `false` 的项会被自动过滤；`insertBetweenDom` 只在相邻两项之间插入，首尾不插入。
- `list` 为假值（如 `null`）时组件直接返回，不会渲染 `fallback`，也不会发起请求。
- 请求是异步的，组件卸载后返回的数据不会触发更新；如果请求过程可被打断，建议在业务侧自行控制。
