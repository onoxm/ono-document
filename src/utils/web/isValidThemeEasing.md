# isValidThemeEasing

校验一个字符串是不是合法的 CSS 缓动值，用于给 `changeThemeClipPathCircle` 的 `easing` 参数把关。

## 基础用法

```ts
import { isValidThemeEasing } from 'ono-react-element'

isValidThemeEasing('ease-in') // true
isValidThemeEasing('cubic-bezier(0.4, 0, 0.2, 1)') // true
isValidThemeEasing('steps(4, jump-end)') // true

isValidThemeEasing('bounce') // false
isValidThemeEasing('cubic-bezier(0,0,0)') // false（参数个数不对）
isValidThemeEasing('') // false
```

用在「让用户自己填缓动」的输入框上，可以把非法值挡在触发动画之前：

```tsx
import { isValidThemeEasing } from 'ono-react-element'
import { useState } from 'react'

function App() {
  const [easing, setEasing] = useState('ease-in')
  const isValid = isValidThemeEasing(easing)

  return (
    <div>
      <input value={easing} onChange={e => setEasing(e.target.value)} />
      {!isValid && <span style={{ color: 'red' }}>不是合法的缓动值</span>}
    </div>
  )
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|待校验的缓动值|<code>string</code>|-|是

返回 `<code>boolean</code>`：合法为 `true`，否则 `false`。

## 允许的形式

类型值|说明
:- | :-
<code>'linear'</code> <code>'ease'</code> <code>'ease-in'</code> <code>'ease-out'</code> <code>'ease-in-out'</code> <code>'step-start'</code> <code>'step-end'</code>|CSS 缓动关键字
<code>cubic-bezier(x1, y1, x2, y2)</code>|四个数值参数，逗号两侧空格可有可无
<code>steps(n)</code> <code>steps(n, jump-end)</code>|第一个参数是正整数，第二个只能是 <code>jump-start</code> / <code>jump-end</code> / <code>jump-none</code> / <code>jump-both</code> / <code>start</code> / <code>end</code>

## 注意事项

- **只校验结构，不校验语义**：`cubic-bezier(2, 0, 0.2, 1)` 也会返回 `true` —— 数值是否越界由浏览器决定，这里不拦。它的目的是挡住拼错的单词、空串、括号里参数个数不对这类「一定会被 `KeyframeEffect` 拒绝」的写法。
- **大小写敏感、不做 trim**：`'EASE-IN'` 和 `'ease-in '`（尾部多了空格）都是 `false`。从输入框取值时先自己 `trim()`。
- 刻意**不用 `CSS.supports`** 做完整解析：它在 jsdom 等环境下与真实浏览器行为不一致，会让单测与线上分叉。
- 数字只接受 `[0-9.]` 组成的字面量，`+1`、`1e2` 这类写法会被判为非法。
- `changeThemeClipPathCircle` 内部就是用它校验 `easing` 的，而且校验发生在「确认浏览器支持 View Transitions」**之后** —— 走不到动画的分支不会因为一个用不上的配置被拦下。
