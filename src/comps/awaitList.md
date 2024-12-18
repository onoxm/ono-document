# AwaitList 异步列表循环
异步获取数组，并将其每一项循环输出到页面上。

## 前置条件
下载Checkbox组件文件,并将文件放入`src/components/tools`文件夹下。

在`src/components/tools/index.ts`写入以下代码
```tsx
export * from './List';
```

## 基础用法
```tsx
import { AwaitList, List } from '@/components/tools'
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

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|需要循环的数组|<code>T[]</code>\|<code>() => T[]</code>\|<code>() => Promise\<T[]></code>|-|是
children|子元素渲染函数|<code>(item: T, index: number) => ReactNode</code>|-|是
fallback|当数组为空时显示的元素|<code>ReactNode</code>\|<code>ReactNode[]</code>|-|否
insertBetweenDom|插入元素的DOM|<code>(i: number) => ReactNode</code>|-|否
deps|依赖项数组，当数组发生变化时触发重新渲染|<code>DependencyList</code>|<code>[]</code>|否
