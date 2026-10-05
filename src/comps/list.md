# List 列表循环
将数组的每一项循环渲染到页面上。

## 基础用法
```tsx
import { List } from 'ono-react-element'

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
    <ul
      style={{ width: '500px', display: 'flex', gap: '8px', listStyle: 'none' }}
    >
      <List list={list}>
        {(item, i) => (
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
              color: '#333'
            }}
          >
            {item}
          </li>
        )}
      </List>
    </ul>
  )
}

export default App;
```

## 数组为空时显示 fallback
```tsx
import { useState } from 'react'
import { Button, List } from 'ono-react-element'

function App() {
  const [list, setList] = useState<string[]>([
    'html',
    'css',
    'javascript',
    'typescript',
    'vue',
    'angular',
    'react'
  ])

  return (
    <>
      <Button
        onClick={() =>
          setList(list => {
            if (list.length) return list.slice(0, -1)
            return list
          })
        }
      >
        去掉一种语言
      </Button>
      <ul
        style={{
          width: '500px',
          display: 'flex',
          gap: '8px',
          listStyle: 'none'
        }}
      >
        <List
          list={list}
          fallback={
            <li style={{ padding: '4px 8px', color: '#333' }}>No Data</li>
          }
        >
          {(item, i) => (
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
                color: '#333'
              }}
            >
              {item}
            </li>
          )}
        </List>
      </ul>
    </>
  )
}

export default App;
```

## 自动过滤渲染结果为空的项
`children` 返回 `null` / `undefined` / `false` 的项会被自动剔除，不会在列表里留下空位。
```tsx
import { List, colorUtils } from 'ono-react-element'

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
      <List list={createDataSource(20)}>
        {(data, i) => {
          return i % 2 === 1 ? (
            <div key={data.id} style={{ width: '100%' }}>
              {data.data}
            </div>
          ) : null
        }}
      </List>
    </div>
  )
}

export default App;
```

## 在列表项之间插入元素
```tsx
import { List } from 'ono-react-element'

function App() {
  const list = ['html', 'css', 'javascript']

  return (
    <ul style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
      <List
        list={list}
        insertBetweenDom={i => (
          <li key={`divider-${i}`} style={{ color: '#999' }}>
            /
          </li>
        )}
      >
        {(item, i) => (
          <li key={i} style={{ padding: '4px 8px' }}>
            {item}
          </li>
        )}
      </List>
    </ul>
  )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|需要循环的数组，也可以传一个返回数组的函数|<code>T[]</code>\|<code>() => T[]</code>|-|是
children|子元素渲染函数|<code>(item: T, index: number) => ReactNode</code>|-|是
fallback|当数组为空时显示的元素|<code>ReactNode</code>\|<code>ReactNode[]</code>|-|否
insertBetweenDom|在每两个列表项之间插入的元素|<code>(i: number) => ReactNode</code>|-|否

## 注意事项
- 列表项**不是**按原数组下标顺序渲染的：`children` 返回 `null` / `undefined` / `false` 的项会被过滤掉，剩下的项顺次排列。
- `fallback` 的判定依据是**过滤后的结果**为空，而不是原数组为空 —— 所有项都返回 `null` 时同样会显示 `fallback`。
- `insertBetweenDom` 只在相邻两项**之间**插入，首尾不会插入；入参 `i` 是间隙的序号。
- `list` 传函数时，组件只在函数引用变化时重新求值。传内联箭头函数（每次渲染都是新引用）等于每次渲染都重新执行一次，请按需用 `useCallback` 包一层。
- 组件本身只返回渲染结果，不产生额外的容器元素，所以外层用什么标签（`ul` / `div` / 任意容器）由你决定；`children` 里给子元素带上 `key`。
