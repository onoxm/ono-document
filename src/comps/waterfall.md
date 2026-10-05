# Waterfall 瀑布流
瀑布流把内容按列排列，每列高度自适应，形成错落有致的布局。适合展示图片、卡片等尺寸不一的内容。

## 特性
- **两种布局策略**：可以固定图片宽度让列数自适应，也可以固定列数让图片宽度自适应
- **自动排版**：按各列当前高度把每一项放进最矮的一列，并计算好每项的位置
- **滚动加载**：滚动到底部附近自动请求下一页
- **图片占位**：图片加载完成前可显示占位内容，避免布局跳动
- **响应式重排**：容器尺寸变化后自动重新计算布局
- **失败即止**：请求返回空数组时认定数据已取完，不再继续请求

## 固定图片宽度
`options` 传数字时表示**图片的固定宽度**，组件会按容器宽度算出能放几列，剩余空间自动均分为列间距。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'

function App() {
  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 400) + 100
        const height = Math.floor(Math.random() * 400) + 100
        imgs.push({
          id: `${width}` + `${height}` + i,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Waterfall
        options={300}
        pageSize={20}
        style={{ width: '100%', height: 500, padding: 12 }}
        request={requestData}
      >
        {img => (
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={img.url}
            alt=""
          />
        )}
      </Waterfall>
    </div>
  )
}

export default App;
```

## 固定列数与间距
`options` 传对象时列数是固定的，图片宽度由容器宽度反推出来。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'

function App() {
  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 400) + 100
        const height = Math.floor(Math.random() * 400) + 100
        imgs.push({
          id: `${width}` + `${height}` + i,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Waterfall
        options={{ gap: 10, columns: 5 }}
        pageSize={20}
        style={{ width: '100%', height: 500, padding: 12 }}
        request={requestData}
      >
        {img => (
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={img.url}
            alt=""
          />
        )}
      </Waterfall>
    </div>
  )
}

export default App;
```

## 图片占位
图片加载完成前显示 `placeholder`，加载完成后才渲染 `children` 的内容。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'

function App() {
  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 400) + 100
        const height = Math.floor(Math.random() * 400) + 100
        imgs.push({
          id: `${width}` + `${height}` + i,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <Waterfall
      options={{ gap: 10, columns: 4 }}
      pageSize={20}
      style={{ width: '100%', height: 500 }}
      request={requestData}
      placeholder={
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'pink',
            color: '#fff'
          }}
        >
          loading...
        </div>
      }
    >
      {img => <img style={{ width: '100%', height: '100%' }} src={img.url} alt="" />}
    </Waterfall>
  )
}

export default App;
```

## 自定义加载中
`loading` 默认为 `true`，会显示一行 `loading...` 文案；传 ReactElement 或函数可以换成自己的骨架屏。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'

function App() {
  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 400) + 100
        const height = Math.floor(Math.random() * 400) + 100
        imgs.push({
          id: `${width}` + `${height}` + i,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <Waterfall
      options={{ gap: 10, columns: 4 }}
      pageSize={20}
      style={{ width: '100%', height: 500 }}
      request={requestData}
      loading={<div style={{ padding: 12, textAlign: 'center' }}>正在加载…</div>}
    >
      {img => <img style={{ width: '100%', height: '100%' }} src={img.url} alt="" />}
    </Waterfall>
  )
}

export default App;
```

## 重新加载数据
`reloadData` 的值发生变化时，组件会清空已加载的全部数据，并从第一页重新请求。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [keyword, setKeyword] = useState('a')

  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 300) + 100
        const height = Math.floor(Math.random() * 300) + 100
        imgs.push({
          id: `${keyword}-${i}`,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <div>
      <button onClick={() => setKeyword(keyword === 'a' ? 'b' : 'a')}>
        切换数据源：{keyword}
      </button>
      <Waterfall
        options={{ gap: 10, columns: 4 }}
        pageSize={20}
        style={{ width: '100%', height: 400 }}
        request={requestData}
        reloadData={keyword}
      >
        {img => <img style={{ width: '100%', height: '100%' }} src={img.url} alt="" />}
      </Waterfall>
    </div>
  )
}

export default App;
```

## 外部触发加载下一页
`updateData` 的值发生变化时会主动请求下一页，适合配合「加载更多」按钮或筛选条件使用。
```tsx
import { ImageItem, Waterfall } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [updateData, setUpdateData] = useState(false)

  const requestData = (_page: number, pageSize: number): Promise<ImageItem[]> => {
    return new Promise<ImageItem[]>(resolve => {
      const imgs: ImageItem[] = []
      for (let i = 0; i < pageSize; i++) {
        const width = Math.floor(Math.random() * 300) + 100
        const height = Math.floor(Math.random() * 300) + 100
        imgs.push({
          id: `${Date.now()}-${i}`,
          url: `https://picsum.photos/${width}/${height}`,
          height,
          width
        })
      }
      resolve(imgs)
    })
  }

  return (
    <div>
      <button onClick={() => setUpdateData(!updateData)}>加载更多</button>
      <Waterfall
        options={{ gap: 10, columns: 4 }}
        pageSize={10}
        style={{ width: '100%', height: 400 }}
        request={requestData}
        updateData={updateData}
      >
        {img => <img style={{ width: '100%', height: '100%' }} src={img.url} alt="" />}
      </Waterfall>
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|布局配置：传 number 为图片固定宽度，传对象为固定列数|<code>number</code>\|<code>{ gap: number; columns: number }</code>|-|是
pageSize|每页的数据条数|<code>number</code>|-|是
request|请求数据的方法，返回一个 Promise|<code>(page: number, pageSize: number) => Promise\<ImageItem[]></code>|-|是
children|每一项的 DOM 结构|<code>(item: ImageItem, index: number) => ReactElement</code>|-|是
className|内容区类名|<code>string</code>|-|否
style|内容区样式|<code>CSSProperties</code>|-|否
bottomThreshold|距底部多少像素内触发加载|<code>number</code>|<code>50</code>|否
resizeDelay|容器尺寸变化后重新排版的节流时间，单位毫秒|<code>number</code>|<code>100</code>|否
placeholder|图片加载完成前显示的占位内容|<code>ReactNode</code>|-|否
loading|加载中的展示，传 <code>true</code> 使用默认文案，传函数则会被调用|<code>boolean</code>\|<code>ReactElement</code>\|<code>() => ReactElement</code>|<code>true</code>|否
reloadData|值变化时清空已加载数据并重新从第一页开始|<code>string</code>\|<code>number</code>|-|否
updateData|值变化时加载下一页|<code>boolean</code>|-|否

### ImageItem
参数|说明|类型
:- | :- | :- 
id|每一项的 id，需在列表内唯一|<code>string</code>\|<code>number</code>
url|图片地址|<code>string</code>
width|图片原始宽度|<code>number</code>
height|图片原始高度|<code>number</code>
[key: string]|其他自定义属性|<code>any</code>

## 注意事项
- `options` 传数字时表示的是**图片宽度**，不是高度，也不是列数；列数由容器宽度除以该值向下取整得到。
- `options` 传对象时列数固定，图片宽度为 `(容器宽度 - gap × (列数 - 1)) / 列数`，即图片宽度会随容器尺寸变化。
- 每一项的高度按 `width` / `height` 的比例换算，因此 `request` 必须返回图片的真实宽高，否则排版会错位。
- `request` 返回空数组即视为数据已取完，之后不会再发起请求；想重新加载需改变 `reloadData`。
- 触底加载监听的是**内容区**（即 `style` 所作用的那层）的滚动，判断依据是「距底部 `bottomThreshold` 像素以内」，同时 `loading` 与 `isFinish` 都会阻止重复请求。
- 容器尺寸变化会触发重新排版，`resizeDelay` 是这次重排的节流时间（默认 100 毫秒）。
- `children` 渲染的内容只在对应图片加载完成后显示，在此之前只显示 `placeholder`（不传则显示空白）。
- `loading` 默认是 `true`，也就是默认会显示一行 `loading...`；不想要就传 `false`。
- `updateData` 是「值发生变化」才触发，保持同一个值不会重复加载；`reloadData` 则会把已有数据全部清空后从第一页重新开始。
- 组件另外还导出了 `VirtualWaterfall`，是瀑布流的虚拟化版本，比 `Waterfall` 多一个 `bufferSize` 参数。
