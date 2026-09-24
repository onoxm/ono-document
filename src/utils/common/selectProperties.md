# selectProperties

从对象中挑选指定属性，或反过来排除指定属性，返回一个新对象。

## 基础用法

```ts
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }

selectProperties(obj, ['a', 'b', 'c']) // { a: 1, b: 2, c: 3 }
selectProperties(obj, ['a', 'b', 'c'], false) // { d: 4, e: 5 }
```

第三个参数为 `false` 时语义是「排除」，常用于剔除不该透传给 DOM 的字段：

```tsx
import { selectProperties } from 'ono-react-element'

const { loading, error, ...restProps } = selectProperties(props, ['loading', 'error'], false)

function App() {
  return <div {...restProps}>内容</div>
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
obj|源对象|<code>T</code>|-|是
properties|属性键数组|<code>(keyof T)[]</code>|<code>[]</code>|否
include|为 <code>true</code> 时挑选这些属性，为 <code>false</code> 时排除它们|<code>boolean</code>|<code>true</code>|否

## 注意事项

- `properties` 传空数组时**直接返回原对象本身**（同一个引用），不会复制一份，注意别误改到原对象。
- `properties` 里有重复键时会抛出 `Error: Each item in properties must be unique`。
- 返回的 `pick` 分支只会带上 `properties` 里列出的键：源对象上没有的键会被写成 `undefined`，而不是跳过。
- 函数带重载声明，`include` 传字面量 `false` 时返回值类型会自动收窄为 `Omit<T, ...>`。
