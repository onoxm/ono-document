# AutoSliderList 自动滑块
一个按钮列表组件，点击某个按钮滑块会自动滑到对应的位置。

## 基础用法
```tsx
import { AutoSliderList } from 'ono-react-element'

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
    <AutoSliderList
      list={list}
      style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
      slider={Slider => (
        <Slider style={{ background: 'pink', borderRadius: 8 }} />
      )}
      sliderTransitionTimingFunction="linear"
    >
      {({ item, isActive }) => (
        <li
          key={item}
          style={{
            width: '100%',
            height: 'fit-content',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: isActive ? '#fff' : '#333'
          }}
        >
          {item}
        </li>
      )}
    </AutoSliderList>
  )
}

export default App;
```

## 使用当前下标属性
```tsx
import { AutoSliderList } from 'ono-react-element'

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
    <AutoSliderList
      list={list}
      style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
      slider={Slider => (
        <Slider style={{ background: 'skyblue', borderRadius: 8 }} />
      )}
      currentIndex={list.findIndex(item => item === 'javascript')}
      sliderTransitionTimingFunction="linear"
    >
      {({ item, isActive }) => (
        <li
          key={item}
          style={{
            width: '100%',
            height: 'fit-content',
            padding: '4px 8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: isActive ? '#fff' : '#333'
          }}
        >
          {item}
        </li>
      )}
    </AutoSliderList>
  )
}

export default App;
```

## 垂直方向
`direction` 传 `Vertical` 时列表变为纵向排列，滑块会跟随当前项的高度上下移动。
```tsx
import { AutoSliderList } from 'ono-react-element'

function App() {
  const list = ['html', 'css', 'javascript', 'typescript']

  return (
    <AutoSliderList
      list={list}
      direction="Vertical"
      style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
      slider={Slider => <Slider style={{ background: 'skyblue' }} />}
    >
      {({ item, isActive }) => (
        <li
          key={item}
          style={{
            width: '100%',
            padding: '4px 8px',
            cursor: 'pointer',
            color: isActive ? '#fff' : '#333'
          }}
        >
          {item}
        </li>
      )}
    </AutoSliderList>
  )
}

export default App;
```

## 禁用点击切换
```tsx
import { AutoSliderList } from 'ono-react-element'

function App() {
  const list = ['html', 'css', 'javascript', 'typescript']

  return (
    <AutoSliderList
      list={list}
      disable
      style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
      slider={Slider => <Slider style={{ background: 'pink' }} />}
    >
      {({ item, isActive }) => (
        <li
          key={item}
          style={{
            width: '100%',
            padding: '4px 8px',
            color: isActive ? '#fff' : '#333'
          }}
        >
          {item}
        </li>
      )}
    </AutoSliderList>
  )
}

export default App;
```

## API
通用属性参考：通用属性

除 `children` 外的 `ul` 原生属性（如 `className`、`style`、`onMouseEnter` 等）会透传到容器元素上。

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
list|列表数据|<code>T[]</code>|-|是
children|子元素渲染函数，必须返回**单个**元素|<code>(\{ item, index, isActive \}: \{ item: T; index: number; isActive: boolean \}) => ReactElement</code>|-|是
slider|自定义滑块外观，入参是滑块组件本身|<code>(Slider: (props: SliderProps) => ReactElement) => ReactElement</code>|-|否
disable|是否禁止点击切换|<code>boolean</code>|<code>false</code>|否
currentIndex|当前选中项的下标|<code>number</code>|<code>0</code>|否
direction|排列方向|<code>'Horizontal'</code>\|<code>'Vertical'</code>|<code>'Horizontal'</code>|否
duration|滑块滑动动画时长（毫秒）|<code>number</code>|<code>300</code>|否
sliderTransitionTimingFunction|滑块动画的缓动函数|<code>string</code>|<code>'ease-in-out'</code>|否

### SliderProps
`slider` 的入参 `Slider` 接收 `<li>` 的全部原生属性，自定义外观直接写在它上面即可：

```tsx
slider={Slider => <Slider className="my-slider" style={{ background: 'pink' }} />}
```

## 注意事项
- 自定义滑块**没有** `sliderStyle` / `sliderClassName` 这类属性，正确做法是通过 `slider` 渲染函数给 `Slider` 传 `style` / `className`。
- 组件会克隆 `children` 返回的元素并注入 `onClick`：**你写在子元素上的 `onClick` 会被保留并先执行**，可以借此感知是哪一项被点击。
- 点击切换的是组件内部的选中态，组件本身**没有对外暴露选中项变化的回调**；若需要完全受控，请在子元素的 `onClick` 里自行记录。
- `disable` 为 `true` 时点击不生效，鼠标样式也会变成 `not-allowed`。
