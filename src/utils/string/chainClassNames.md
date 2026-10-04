# chainClassNames

把多个类名拼接成一个字符串，并过滤掉 `null`、`undefined` 和空字符串。

## 基础用法

```ts
chainClassNames('page', 'container') // 'page container'
chainClassNames('btn', undefined, 'btn-primary') // 'btn btn-primary'
chainClassNames('', null, undefined) // ''
```

它是变长参数，数量不限，条件拼接直接写进参数列表即可：

```tsx
import { chainClassNames } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(false)

  return (
    <div
      className={chainClassNames('box', active && 'box-active')}
      onClick={() => setActive(v => !v)}
    >
      {active ? '已激活' : '未激活'}
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
classNames|一个或多个类名，无效值会被跳过|<code>...string</code>\|<code>undefined</code>\|<code>null</code>|-|否

## 注意事项

- 返回值不会带首尾空格：`chainClassNames('', 'a')` 得到 `'a'`，而不是 `' a'`。
- 参数全部无效时返回空字符串，可以直接交给 `className`，不会渲染出多余的 `class=""`。
