# VirtualList 虚拟列表
虚拟列表，即只渲染可视区域内的元素，当滚动时，动态添加或删除元素，从而提高渲染性能。

## 特性
- **高性能渲染**：只渲染可视区域内的元素，大大减少DOM节点数量
- **灵活的高度支持**：支持固定高度和动态高度的列表项
- **多方向支持**：支持垂直和水平方向的列表布局
- **触底检测**：提供触底回调，方便实现无限滚动加载功能
- **自定义样式**：支持自定义容器和包装器的类名和样式
- **可配置刷新速度**：可根据需求调整滚动时的刷新频率

## 使用场景
虚拟列表适用于需要展示大量数据项的场景，如：
- 大量数据的表格展示
- 聊天记录列表
- 新闻或社交媒体信息流
- 商品列表
- 任何需要高性能长列表渲染的场景

## 前置条件
该组件依赖于`useEventListener`hook，需要先下载 <a href='/ono-document/hooks/useEventListener'>useEventListener</a> 文件至`src/hooks`文件夹中。

下载VirtualList组件文件,并将文件放入`src/components/modules`文件夹下。

在`src/components/modules/index.ts`写入以下代码
```tsx
export * from './VirtualList';
```

## 固定高度
```tsx
import { createDataSource, EstimatedVirtualList } from '@/components/modules'
import colorUtils from '@/utils/colorUtils'
import { useMemo } from 'react'

function App() {
    const dataSource = useMemo(() => {
        // 推荐使用组件中导出的createDataSource方法创建数据源
        return createDataSource(
            Array(20)
                .fill(null)
                .map((_, i) => i),
            i => {
                const clr = colorUtils.randomColor()
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
                            color: colorUtils.getContrastColor(clr)!
                        }}
                    >
                        序号：{i + 1} 高度：80px
                    </div>
                )
            }
        )
    }, [])
    
    return (
        <div style={{ width: '800px', height: '500px' }}>
            <EstimatedVirtualList dataSource={dataSource} />
        </div>
    )
}

export default App;
```

## 不定高度
```tsx
import { createDataSource, EstimatedVirtualList } from '@/components/modules'
import colorUtils from '@/utils/colorUtils'
import { useMemo } from 'react'

function App() {
    const dataSource = useMemo(() => {
        // 推荐使用组件中导出的createDataSource方法创建数据源
        return createDataSource(
            Array(20)
                .fill(null)
                .map((_, i) => i),
            i => {
                const clr = colorUtils.randomColor()
                return (
                    <div
                        style={{
                        width: '100%',
                        height: i % 2 === 0 ? '80px' : '120px',
                        lineHeight: i % 2 === 0 ? '80px' : '120px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: clr,
                        textAlign: 'center',
                        color: colorUtils.getContrastColor(clr)!
                        }}
                    >
                        序号：{i + 1} 高度：{i % 2 === 0 ? '80' : '120'}px
                    </div>
                )
            }
        )
    }, [])

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
```tsx
import { createDataSource, EstimatedVirtualList } from '@/components/modules'
import colorUtils from '@/utils/colorUtils'
import { useMemo } from 'react'

function App() {
    const dataSource = useMemo(() => {
        // 推荐使用组件中导出的createDataSource方法创建数据源
        return createDataSource(
            Array(20)
                .fill(null)
                .map((_, i) => i),
            i => {
                const clr = colorUtils.randomColor()
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
                            color: colorUtils.getContrastColor(clr)!
                        }}
                    >
                        序号：{i + 1} 高度：80px
                    </div>
                )
            }
        )
    }, [])
    
    return (
        <div style={{ width: '800px', height: '500px' }}>
            <EstimatedVirtualList dataSource={dataSource} direction="horizontal" />
        </div>
    )
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
containerClassName|虚拟列表的container类名|<code>string</code>|-|否
containerStyle|虚拟列表的container样式|<code>CSSProperties</code>|-|否
refreshSpeed|虚拟列表滚动时的刷新速度|<code>number</code>|<code>50</code>|否
estimatedHeight|预估每一项的高度|<code>number</code>|<code>35</code>|否
wrapperClassName|虚拟列表的wrapper类名|<code>string</code>|-|否
wrapperStyle|虚拟列表的wrapper样式|<code>CSSProperties</code>|-|否
direction|虚拟列表的方向|<code>'vertical'</code>\|<code>'horizontal'</code>|<code>'vertical'</code>|否
dataSource|数据源|<code>VirtualListDataSource[]</code>|-|是
onEndCallback|虚拟列表滚动到底部是触发的回调|<code>() => void</code>|-|否

### VirtualListDataSource
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
id|每一项的id|<code>number</code>|<code>number</code>|是
data|每一项的数据|<code>ReactNode</code>|<code>ReactNode</code>|是
