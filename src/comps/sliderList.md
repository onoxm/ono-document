# SliderList 滑块列表
一个按钮列表组件，点击某个按钮滑块会自动滑到对应的位置。

## 基础用法
```tsx
import { SliderList } from 'ono-react-element'

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
    <SliderList
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
    </SliderList>
  )
}

export default App;
```

## 使用当前下标属性
```tsx
import { SliderList } from 'ono-react-element'

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
    <SliderList
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
    </SliderList>
  )
}

export default App;
```

## 垂直方向
`direction` 传 `Vertical` 时列表变为纵向排列，滑块会跟随当前项的高度上下移动。
```tsx
import { SliderList } from 'ono-react-element'

function App() {
  const list = ['html', 'css', 'javascript', 'typescript']

  return (
    <SliderList
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
    </SliderList>
  )
}

export default App;
```

## 禁用点击切换
```tsx
import { SliderList } from 'ono-react-element'

function App() {
  const list = ['html', 'css', 'javascript', 'typescript']

  return (
    <SliderList
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
    </SliderList>
  )
}

export default App;
```

## 悬停预览
`hoverToSlide` 让滑块跟着鼠标走：悬停到哪一项就滑到哪一项，但**这只是预览，不改变选中项** —— 鼠标移出整个列表后滑块会**回弹**到真正选中的那一项。
```tsx
import { SliderList } from 'ono-react-element'

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
    <SliderList
      list={list}
      hoverToSlide
      style={{ gap: 8, padding: 8, border: '2px dashed #ccc' }}
      slider={Slider => (
        <Slider style={{ background: '#b7e4c7', borderRadius: 8 }} />
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
            color: isActive ? '#333' : '#888'
          }}
        >
          {item}
        </li>
      )}
    </SliderList>
  )
}

export default App;
```
悬停期间 `isActive` 也跟着走，所以视觉表现和点击后一致 —— 这一项该高亮就高亮，不需要自己再维护一套预览态。只有**点击**才真正落地选中，用户滑一圈又移开不会误选。

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
hoverToSlide|鼠标悬停到某一项时让滑块滑过去（临时预览，不改变选中项）|<code>boolean</code>|<code>false</code>|否
direction|排列方向|<code>'Horizontal'</code>\|<code>'Vertical'</code>|<code>'Horizontal'</code>|否
duration|滑块滑动动画时长（毫秒）|<code>number</code>|<code>300</code>|否
sliderTransitionTimingFunction|滑块动画的缓动函数|<code>string</code>|<code>'ease-in-out'</code>|否

### SliderProps
`slider` 的入参 `Slider` 只接住 `className`、`style` 与 `children`，自定义外观直接写在它上面即可：

```tsx
slider={Slider => <Slider className="my-slider" style={{ background: 'pink' }} />}
```

## 注意事项
- 组件名是 **`SliderList`**，对应的类型是 `SliderListProps`。旧名 **`AutoSliderList` 仍在包内导出**、行为不变（只是把 props 原样转交给 `SliderList` 的薄壳），但已标注 `@deprecated`，将在 **0.7.0 移除** —— 换名字即可，props 逐字未变。⚠️ 唯一要一并改的是自定义 CSS：类名前缀已从 `ono-auto-slider-list-*` 变成 `ono-slider-list-*`，薄壳复用的就是 `SliderList` 这份样式。
- 自定义滑块**没有** `sliderStyle` / `sliderClassName` 这类属性，正确做法是通过 `slider` 渲染函数给 `Slider` 传 `style` / `className`。滑块的尺寸与位移由组件写成内联样式，`className` 压不过它们，只能走 `style`。
- 组件会克隆 `children` 返回的元素并注入 `onClick`：`disable` 未开启时**你写在子元素上的 `onClick` 会被保留并先执行**，可以借此感知是哪一项被点击。
- 点击切换的是组件内部的选中态，组件本身**没有对外暴露选中项变化的回调**；若需要完全受控，请在子元素的 `onClick` 里自行记录。
- `disable` 为 `true` 时点击不生效，鼠标样式也会变成 `not-allowed`；此时**子元素自己的 `onClick` 也不会被调用**（组件在调用它之前就返回了）。
- `hoverToSlide` 的预览态与选中态是**两个独立状态**：悬停只改预览，点击才改选中。因此「鼠标移出后回弹」是必然行为，不是 bug；反过来，想让滑块停在某一项就只能靠点击或 `currentIndex`。
- 回弹的判据是**鼠标离开整个容器**（容器上的 `onMouseLeave`），在列表**内部**从一个项滑到另一项不会回弹。你自己传的 `onMouseLeave` 仍会被调用，且先于回弹执行。
- `hoverToSlide` 下组件会给你子元素的 `onMouseEnter` 外面包一层，**原有回调照常先执行**；`disable` 为 `true` 时原回调照样执行、只是不做预览（与 `onClick` 的取舍不同：`disable` 不该顺带吞掉调用方自己的悬停逻辑）。关闭 `hoverToSlide` 时不会注入任何 `onMouseEnter`，不会抹掉你自己的。
