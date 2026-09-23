# VirtualList 虚拟列表
虚拟列表只渲染可视区域内的元素，滚动时动态添加或删除，从而提高长列表的渲染性能。

## 特性
- **高性能渲染**：只渲染可视区域内的元素，大幅减少 DOM 节点数量
- **两种高度策略**：`EstimatedVirtualList` 支持不定高度（运行时测量），`FixedVirtualList` 面向高度固定的场景
- **多方向支持**：支持垂直与水平方向的列表布局
- **触底检测**：提供触底回调，方便实现无限滚动加载
- **可配置的预渲染**：通过 `overscan` 控制可视区外额外渲染的范围，兼顾流畅度与内存
- **自定义样式**：容器与列表的类名、样式均可自定义

## 固定高度
`EstimatedVirtualList` 只需要一个 `dataSource`，每项的高度由组件在渲染后自行测量。
```tsx
import {
  createDataSource,
  EstimatedVirtualList,
  getContrastColor,
  randomColor
} from 'ono-react-element'
import { useMemo } from 'react'

function App() {
  const dataSource = useMemo(
    () =>
      createDataSource(
        Array(20)
          .fill(null)
          .map((_, i) => i),
        i => {
          const clr = randomColor()
          return (
            <div
              style={{
                width: '100%',
                height: '80px',
                lineHeight: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: clr,
                textAlign: 'center',
                color: getContrastColor(clr)!
              }}
            >
              序号：{i + 1} 高度：80px
            </div>
          )
        }
      ),
    []
  )

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <EstimatedVirtualList dataSource={dataSource} />
    </div>
  )
}

export default App;
```

## 不定高度
每一项高度不同时同样交给 `EstimatedVirtualList`，它会先按 `estimatedSize` 估算，再根据实际测量结果修正总高度，滚动条不会来回跳动。
```tsx
import {
  createDataSource,
  EstimatedVirtualList,
  getContrastColor,
  randomColor
} from 'ono-react-element'
import { useMemo } from 'react'

function App() {
  const dataSource = useMemo(
    () =>
      createDataSource(
        Array(20)
          .fill(null)
          .map((_, i) => i),
        i => {
          const clr = randomColor()
          const height = i % 2 === 0 ? 80 : 120
          return (
            <div
              style={{
                width: '100%',
                height: `${height}px`,
                lineHeight: `${height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: clr,
                textAlign: 'center',
                color: getContrastColor(clr)!
              }}
            >
              序号：{i + 1} 高度：{height}px
            </div>
          )
        }
      ),
    []
  )

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <EstimatedVirtualList
        wrapperStyle={{ gap: 10 }}
        dataSource={dataSource}
        onEndCallback={() => console.log('触底了')}
      />
    </div>
  )
}

export default App;
```

## 横向列表
`direction` 设为 `horizontal` 后，滚动方向变为横向，此时容器需要有确定的宽度、项需要有确定的宽度。
```tsx
import {
  createDataSource,
  EstimatedVirtualList,
  getContrastColor,
  randomColor
} from 'ono-react-element'
import { useMemo } from 'react'

function App() {
  const dataSource = useMemo(
    () =>
      createDataSource(
        Array(20)
          .fill(null)
          .map((_, i) => i),
        i => {
          const clr = randomColor()
          return (
            <div
              style={{
                width: '200px',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: clr,
                color: getContrastColor(clr)!
              }}
            >
              序号：{i + 1}
            </div>
          )
        }
      ),
    []
  )

  return (
    <div style={{ width: '800px', height: '100px' }}>
      <EstimatedVirtualList dataSource={dataSource} direction="horizontal" />
    </div>
  )
}

export default App;
```

## 固定项高度
如果每一项高度完全一致，用 `FixedVirtualList` 更划算：传入 `itemSize` 后，总高度与可视区间都能直接算出来，不需要运行时测量与重排，拖动滚动条也更顺滑。
```tsx
import {
  createDataSource,
  FixedVirtualList,
  getContrastColor,
  randomColor
} from 'ono-react-element'
import { useMemo } from 'react'

function App() {
  const dataSource = useMemo(
    () =>
      createDataSource(
        Array(1000)
          .fill(null)
          .map((_, i) => i),
        i => {
          const clr = randomColor()
          return (
            <div
              style={{
                width: '100%',
                height: '40px',
                lineHeight: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: clr,
                color: getContrastColor(clr)!
              }}
            >
              序号：{i + 1} 固定高度 40px
            </div>
          )
        }
      ),
    []
  )

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <FixedVirtualList itemSize={40} dataSource={dataSource} />
    </div>
  )
}

export default App;
```

## 配置 overscan
`overscan` 用于在可视区域外多渲染一部分，减少快速滚动时的白屏。它支持绝对数量、分数、带单位的尺寸以及完整配置对象四种写法。
```tsx
import { createDataSource, FixedVirtualList } from 'ono-react-element'
import { useMemo } from 'react'

function App() {
  const dataSource = useMemo(
    () =>
      createDataSource(
        Array(1000)
          .fill(null)
          .map((_, i) => i),
        i => (
          <div
            style={{
              width: '100%',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              background: i % 2 === 0 ? '#1e293b' : '#334155',
              color: '#e2e8f0'
            }}
          >
            序号：{i + 1}
          </div>
        )
      ),
    []
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ width: '800px', height: '200px' }}>
        <FixedVirtualList itemSize={40} dataSource={dataSource} overscan={5} />
      </div>
      <div style={{ width: '800px', height: '200px' }}>
        <FixedVirtualList
          itemSize={40}
          dataSource={dataSource}
          overscan="1/10"
        />
      </div>
      <div style={{ width: '800px', height: '200px' }}>
        <FixedVirtualList
          itemSize={40}
          dataSource={dataSource}
          overscan="200px"
        />
      </div>
    </div>
  )
}

export default App;
```

## API
### 公共参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
dataSource|数据源|<code>VirtualListDataSource[]</code>|-|是
direction|滚动方向|<code>'vertical'</code>\|<code>'horizontal'</code>|<code>'vertical'</code>|否
refreshSpeed|滚动时的刷新间隔，单位毫秒|<code>number</code>|自动探测一帧耗时（最小 <code>8</code>）|否
overscan|可视区外的预渲染配置|<code>OverscanInput</code>|<code>{ size: 300, max: 10 }</code>|否
containerClassName|滚动容器的类名|<code>string</code>|-|否
containerStyle|滚动容器的样式|<code>CSSProperties</code>|<code>{}</code>|否
wrapperClassName|内部列表的类名|<code>string</code>|-|否
wrapperStyle|内部列表的样式|<code>CSSProperties</code>|<code>{}</code>|否
updateDataSourceScroll2Top|数据源更新后是否滚动回顶部|<code>boolean</code>|-|否
onEndCallback|滚动到底部时触发的回调|<code>() => void</code>|-|否
containerRef|获取内部滚动容器的 ref|<code>RefObject\<HTMLDivElement \| null></code>|-|否

### EstimatedVirtualList
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
estimatedSize|预估的单项尺寸，支持传函数动态计算|<code>number</code>\|<code>() => number</code>|<code>35</code>|否

### FixedVirtualList
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
itemSize|固定的单项尺寸，垂直方向为高度、水平方向为宽度|<code>number</code>|-|是

### VirtualListDataSource
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|每一项的 id，会被当作下标使用|<code>number</code>|-|是
data|每一项的内容|<code>ReactNode</code>|-|是

### OverscanInput
类型|说明
:- | :- 
<code>number</code>|绝对数量，如 <code>5</code>，不受 <code>max</code> 限制
<code>'a/b'</code>|占数据源总长度的比例，如 <code>'1/10'</code>，受 <code>max</code> 限制
<code>'Npx'</code>|按尺寸换算的数量，支持 <code>px</code> / <code>vw</code> / <code>rem</code> 等单位，受 <code>max</code> 限制
<code>{ count?, size?, max? }</code>|完整配置，<code>count</code> 可传数量或分数写法
不传|等价于 <code>{ size: 300, max: 10 }</code>

## 注意事项
- 数据源请用组件导出的 **`createDataSource`** 生成：内部会把每项的 `id` 直接当作数组下标使用，因此 `id` 必须是 `0 ~ n-1` 的连续数字，自己拼数据源时很容易踩到错位。
- `estimatedSize` 是当前的名字，旧版本叫 `estimatedHeight`；它同时支持传函数，适合行高随数据变化的场景。
- `refreshSpeed` 不传时组件会先探测一帧的耗时作为刷新间隔（最小 8 毫秒），而不是固定值。
- `onEndCallback` 的触发条件是「距底部 20px 以内」，而滚动回调本身会被 `refreshSpeed` 节流，所以快速滚动时它可能被合并为一次触发。
- 滚动容器需要有确定的尺寸（高度或宽度），否则可视区高度为 0，列表不会渲染任何内容。
- `containerStyle` 作用在外层滚动容器、`wrapperStyle` 作用在内部的 `ul` 上；给 `wrapperStyle` 加 `gap` / `padding` 可以控制项间距与内边距。
- `updateDataSourceScroll2Top` 为真时，数据源变化会先滚动回顶部再渲染。
