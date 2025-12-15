# chainClassNames
批量设置元素样式类名

## 示例
```tsx
import { chainClassNames } from 'ono-react-element'

function App() {
    return <div className={chainClassNames('page', 'container')}></div>
}

export default App;
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
classNames|样式类名, 可传一个或多个|<code>string</code>|-|是
