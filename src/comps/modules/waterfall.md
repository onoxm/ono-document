# Waterfall 瀑布流
Waterfall 瀑布流组件是一种常用于展示图片或其他内容的高性能列表组件。它通过将内容按列排列，每列高度自动适应内容高度，形成经典的瀑布流布局效果。

## 特性
- **自适应布局**：支持自定义列数和间距，自动计算每项位置
- **高性能渲染**：适用于大量数据展示场景
- **无限滚动加载**：支持分页加载更多数据
- **灵活配置**：可自定义列数、间距等参数
- **响应式设计**：自动适应容器尺寸变化

## 使用场景
瀑布流组件特别适用于以下场景：
- 图片展示网站或应用
- 商品展示列表
- 社交媒体内容流
- 博客或新闻资讯展示
- 任何需要美观展示内容集合的场景

## 前置条件
该组件依赖于`useEventListener`hook，需要先下载 <a href='/ono-document/hooks/useEventListener'>useEventListener</a> 文件至`src/hooks`文件夹中。

下载Waterfall组件文件,并将文件放入`src/components/modules`文件夹下。

在`src/components/modules/index.ts`写入以下代码
```tsx
export * from './Waterfall';
```

## 固定高度
```tsx
import { ImageItem, Waterfall } from '@/components/modules'

function App() {
  const requestData = (
    _page: number,
    pageSize: number
  ): Promise<ImageItem[]> => {
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
        style={{
          width: '100%',
          height: 500,
          border: '1px solid black',
          padding: 12
        }}
        request={requestData}
      >
        {img => (
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
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

## 修改配置gap和columns
```tsx
import { ImageItem, Waterfall } from '@/components/modules'

function App() {
  const requestData = (
    _page: number,
    pageSize: number
  ): Promise<ImageItem[]> => {
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
        style={{
          width: '100%',
          height: 500,
          border: '1px solid black',
          padding: 12
        }}
        request={requestData}
      >
        {img => (
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
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

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
options|瀑布流的配置项|<code>number</code>\|<code>{ gap: number; columns: number }</code>|-|是
pageSize|每页的数据条数|<code>number</code>|-|是
className|瀑布流的类名|<code>string</code>|-|否
style|瀑布流的样式|<code>CSSProperties</code>|-|否
bottomThreshold|滚动到底部的阈值，到达阈值会更新数据|<code>number</code>|<code>50</code>|否
reloadData|重新加载数据的依赖项，当该数据更新时，会重新清除之前的所有数据，重新获取|<code>string</code>\|<code>number</code>|-|否
updateData|用于组件外部控制瀑布流内部数据的更新|<code>boolean</code>|-|否
loading|显示加载中的样式|<code>boolean</code>\|<code>ReactElement</code>\|<code>() => ReactElement</code>|-|否
children|瀑布流中每一项的DOM结构|<code>(item: ImageItem, index: number) => ReactElement</code>|-|是
request|请求数据的方法，返回一个Promise对象|<code>(page: number, pageSize: number) => Promise<ImageItem[]></code>|-|是

### ImageItem
参数|说明|类型
:- | :- | :- 
id|每一项的id|<code>string</code>\|<code>number</code>
url|图片的url|<code>string</code>
width|图片的宽度|<code>number</code>
height|图片的高度|<code>number</code>
[key: string]|其他属性|<code>any</code>
