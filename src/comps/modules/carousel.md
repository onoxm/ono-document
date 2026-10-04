# Carousel 轮播
自动或手动切换的多项轮播，支持横向 / 纵向、无限循环、指示点与自定义箭头。

## 基础用法
`children` 传入若干元素，默认显示左右箭头与底部指示点：

```tsx
import { Carousel } from 'ono-react-element'

const itemStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontSize: 24
}

function App() {
  return (
    <Carousel
      style={{ width: 500, height: 200, borderRadius: 8, overflow: 'hidden' }}
    >
      <div style={{ ...itemStyle, background: 'skyblue' }}>1</div>
      <div style={{ ...itemStyle, background: 'pink' }}>2</div>
      <div style={{ ...itemStyle, background: 'orange' }}>3</div>
    </Carousel>
  )
}

export default App;
```

## 自动播放
`autoPlay` 打开自动切换，`duration` 是每一张的停留时间（默认 `2000`）；鼠标移入组件时会暂停：

```tsx
import { Carousel } from 'ono-react-element'

function App() {
  return (
    <Carousel
      autoPlay
      duration={3000}
      style={{ width: 500, height: 200, overflow: 'hidden' }}
    >
      <div style={{ height: '100%', background: 'skyblue' }}>1</div>
      <div style={{ height: '100%', background: 'pink' }}>2</div>
    </Carousel>
  )
}

export default App;
```

## 受控切换
`current` 是**从 `0` 开始**的受控下标，配合 `afterChange` 同步外部状态：

```tsx
import { useState } from 'react'
import { Button, Carousel } from 'ono-react-element'

function App() {
  const [current, setCurrent] = useState(0)

  return (
    <div>
      <Button onClick={() => setCurrent(current - 1)}>上一张</Button>
      <Button onClick={() => setCurrent(current + 1)}>下一张</Button>
      <Carousel
        current={current}
        afterChange={setCurrent}
        style={{ width: 500, height: 200, overflow: 'hidden' }}
      >
        <div style={{ height: '100%', background: 'skyblue' }}>1</div>
        <div style={{ height: '100%', background: 'pink' }}>2</div>
        <div style={{ height: '100%', background: 'orange' }}>3</div>
      </Carousel>
    </div>
  )
}

export default App;
```

## 纵向轮播
`direction` 传 `'vertical'` 改为上下切换：

```tsx
import { Carousel } from 'ono-react-element'

function App() {
  return (
    <Carousel
      direction="vertical"
      style={{ width: 300, height: 200, overflow: 'hidden' }}
    >
      <div style={{ height: '100%', background: 'skyblue' }}>1</div>
      <div style={{ height: '100%', background: 'pink' }}>2</div>
    </Carousel>
  )
}

export default App;
```

## 自定义箭头与指示点
`prevButton` / `nextButton` 可以传节点，也可以传返回节点的函数；`dots={false}` 隐藏指示点，`showArrow={false}` 隐藏箭头：

```tsx
import { Carousel } from 'ono-react-element'

function App() {
  return (
    <Carousel
      prevButton={<span>←</span>}
      nextButton={() => <span>→</span>}
      dots={false}
      style={{ width: 500, height: 200, overflow: 'hidden' }}
    >
      <div style={{ height: '100%', background: 'skyblue' }}>1</div>
      <div style={{ height: '100%', background: 'pink' }}>2</div>
    </Carousel>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
children|每一帧的内容，**必须是数组**|<code>ReactElement[]</code>|-|是
current|受控的当前下标，从 <code>0</code> 开始|<code>number</code>|-|否
afterChange|切换完成后的回调，参数是真实下标|<code>(current: number) => void</code>|-|否
autoPlay|是否自动播放|<code>boolean</code>|<code>false</code>|否
duration|自动播放时每一张的停留时间（ms）|<code>number</code>|<code>2000</code>|否
speed|切换动画时长（ms）|<code>number</code>|<code>300</code>|否
direction|切换方向|<code>'horizontal'</code>\|<code>'vertical'</code>|<code>'horizontal'</code>|否
dots|是否显示指示点|<code>boolean</code>|<code>true</code>|否
showArrow|是否显示左右 / 上下箭头|<code>boolean</code>|<code>true</code>|否
prevButton|自定义上一个按钮|<code>ReactNode</code>\|<code>() =&gt; ReactNode</code>|<code>'prev'</code>|否
nextButton|自定义下一个按钮|<code>ReactNode</code>\|<code>() =&gt; ReactNode</code>|<code>'next'</code>|否
waitForAnimate|动画进行中是否忽略新的切换请求|<code>boolean</code>|<code>true</code>|否
className|自定义类名|<code>string</code>|-|否
style|自定义样式，容器需要有确定的宽高|<code>CSSProperties</code>|-|否

## 注意事项
- `children` **必须是数组**：组件内部用 `children.length` 算张数，条件渲染出 `undefined` 或只给单个元素都会导致显示异常。
- `current` 是**受控**的，且从 `0` 开始。传了它就要在 `afterChange` 里回写，否则切换后会被外部值弹回去。
- 无缝循环靠**首尾各克隆一个节点**实现，实际渲染的帧比 `children` 多两个；`afterChange` 与指示点给出的都是真实下标。
- `waitForAnimate` 默认 `true`，切换动画还没结束时的点击会被忽略，避免连点跳帧。
- 只有 `autoPlay` 打开、且鼠标不在组件内时才自动切换；手动切换后会重新开始计时。
- 容器需要有确定的尺寸（`style` / `className` 给出），尺寸为 `0` 时一帧都不会渲染。
