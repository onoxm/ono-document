# Card3D 3D卡片
鼠标在卡片上移动时，卡片会跟随指针产生 3D 倾斜，移出后自动回正。

## 特性
- **两种内容来源**：用 `src` 快速传一张图片，或用 `children` 放任意内容
- **可调的倾斜幅度**：`xRange` / `yRange` 分别控制两个方向的旋转角度范围
- **可选放大效果**：`enlarge` 为真时鼠标悬停会按 `scale` 放大卡片
- **自定义外观**：支持阴影与圆角

## 基础用法
```tsx
import { Card3D } from 'ono-react-element'

function App() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card3D
        src="https://picsum.photos/400/600"
        shadow="-3px -3px 10px #54a29e, 3px 3px 10px #a79d66"
      />
    </div>
  )
}

export default App;
```

## 自定义内容
`children` 存在时 `src` 会被忽略，卡片内容完全由 `children` 决定。
```tsx
import { Card3D } from 'ono-react-element'

function App() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card3D
        borderRadius={16}
        shadow="0 12px 24px rgba(0, 0, 0, 0.2)"
      >
        <div
          style={{
            width: 320,
            height: 200,
            padding: 24,
            color: '#fff',
            background: 'linear-gradient(135deg, #5644b8, #40a9ff)'
          }}
        >
          <h2>卡片标题</h2>
          <p>卡片里可以放任意内容，倾斜效果由组件自动处理。</p>
        </div>
      </Card3D>
    </div>
  )
}

export default App;
```

## 调整倾斜幅度
`xRange` 控制绕 x 轴（上下移动）的旋转角度范围，`yRange` 控制绕 y 轴（左右移动）的旋转角度范围，单位为角度。
```tsx
import { Card3D } from 'ono-react-element'

function App() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card3D
        src="https://picsum.photos/400/600"
        xRange={[-20, 20]}
        yRange={[-20, 20]}
      />
    </div>
  )
}

export default App;
```

## 悬停放大
`enlarge` 为 `true` 时，鼠标悬停会按 `scale` 放大卡片；`scale` 只在 `enlarge` 为真时生效。
```tsx
import { Card3D } from 'ono-react-element'

function App() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card3D src="https://picsum.photos/400/600" enlarge scale={1.05} />
    </div>
  )
}

export default App;
```

## API
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
src|图片地址|<code>string</code>|-|否（与 <code>children</code> 至少填一个）
children|卡片内容，存在时 <code>src</code> 被忽略|<code>ReactNode</code>|-|否（与 <code>src</code> 至少填一个）
scale|悬停放大倍数，仅在 <code>enlarge</code> 为 <code>true</code> 时生效|<code>number</code>|<code>1.1</code>|否
shadow|卡片阴影|<code>string</code>|-|否
enlarge|悬停时卡片是否放大|<code>boolean</code>|<code>false</code>|否
xRange|绕 x 轴的旋转角度范围|<code>[number, number]</code>|<code>[-10, 10]</code>|否
yRange|绕 y 轴的旋转角度范围|<code>[number, number]</code>|<code>[-10, 10]</code>|否
borderRadius|卡片圆角|<code>number</code>\|<code>string</code>|<code>20</code>|否

## 注意事项
- `src` 与 `children` 都没有时组件会直接抛错 `请传入children或者src属性`，不会静默渲染成空白。
- 卡片本身不设宽高，尺寸完全由内容（或图片原始尺寸）撑开；想固定大小请给 `children` 里的元素写宽高。
- 倾斜角度是按「指针在卡片内的相对位置」映射到 `xRange` / `yRange` 的，因此左右上下移动都会参与计算，鼠标移出后会重置为 `0deg`。
