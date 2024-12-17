# List 列表循环
将数组的每一项循环输出到页面上。

## 前置条件
下载Checkbox组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './List';
```

## 基础用法
```tsx
import { List } from '@/components/tools'

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

## 数组为空时显示fallback
```tsx
import { List } from '@/components/tools'
import { Button } from '@/components/elements'

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

## 自动去掉数组中的null和undefined
```tsx
import { List } from '@/components/tools'
import colorUtils from '@/utils/colorUtils'

function App() {
  const createDataSource = (num: number) => {
    const arr = []
    for (let i = 0; i < num; i++) {
      const clr = colorUtils.randomColor()
      arr.push({
        id: i,
        data: (
          <div
            className="w-full text-center"
            style={{
              height: i % 2 === 0 ? '80px' : '120px',
              lineHeight: i % 2 === 0 ? '80px' : '120px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: clr,
              color: colorUtils.getContrastColor(clr)!
            }}
          >
            序号：{i + 1} 高度：
            {i % 2 === 0 ? '80' : '120'}px
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

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|需要循环的数组|<code>T[]</code>\|<code>(() => T[])</code>|-|是
children|子元素渲染函数|<code>(item: T, index: number) => ReactNode</code>|-|是
fallback|当数组为空时显示的元素|<code>ReactNode</code>\|<code>ReactNode[]</code>|-|否
insertBetweenDom|插入元素的DOM|<code>(i: number) => ReactNode</code>|-|否
