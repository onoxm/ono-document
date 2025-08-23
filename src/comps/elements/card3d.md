# Card3D 3D卡片
Card3D组件是卡片组件，可以实现3D效果。

## 前置条件
在react项目入口文件中引入样式，默认为`src/main.tsx`。
```tsx
import 'ono-react-element/dist/style/Card3D.css'
```

## 基础用法
```tsx
import { Card3D } from 'ono-react-element'

function App() {
    return <div
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
            <Card3D shadow="-3px -3px 10px #54a29e, 3px 3px 10px #a79d66">
                <img src="https://picsum.photos/400/600" alt="图片" />
            </Card3D>
    </div>
}

export default App;
```

## API
通用属性参考：通用属性
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
src|图片地址|<code>string</code>|-|否(当children存在时，src属性无效)
scale|缩放比例|<code>number</code>|<code>1.1</code>|否
shadow|卡片阴影|<code>string</code>|-|否
enlarge|hover时卡片是否放大比例|<code>boolean</code>|<code>false</code>|否
xRange|x轴移动范围|<code>[number, number]</code>|<code>[-10, 10]</code>|否
yRange|y轴移动范围|<code>[number, number]</code>|<code>[-10, 10]</code>|否
children|卡片内容|<code>ReactNode</code>|-|否(当src存在时，childre可以不填)
borderRadius|卡片圆角|<code>string</code>\|<code>number</code>|<code>20</code>|否

## 注意事项
- src和children必须有一个存在，否则组件会报错。