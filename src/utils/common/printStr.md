# printStr

打字机效果：把字符串逐字符输出到指定元素。

## 基础用法

```tsx
import { useEffect, useRef } from 'react'
import { printStr } from 'ono-react-element'

function App() {
  const elRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!elRef.current) return

    printStr({
      el: elRef.current,
      str: '你好，这是一段打字机效果的文字',
      speed: 100,
      onDone: () => console.log('输出完成')
    })
  }, [])

  return <p ref={elRef} />
}

export default App;
```

在已有内容后面接着输出：

```ts
printStr({ el, str: '追加的文字', isExtendStr: true })
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
el|输出目标元素|<code>HTMLElement</code>|-|是
str|待输出的字符串|<code>string</code>|<code>'hello world'</code>|否
speed|每个字符的输出间隔（毫秒）|<code>number</code>|<code>100</code>|否
isExtendStr|是否在元素已有内容之后追加|<code>boolean</code>|<code>true</code>|否
onDone|输出完成后的回调|<code>() =&gt; void</code>|-|否

## 注意事项

- 直接改写 `el.textContent`，所以**会清掉元素内原有的子节点**（标签、组件都会被抹掉），请给它一个纯文本容器。
- `isExtendStr` 为 `true` 且元素已有文本时，会把已有文本拼在新字符串前面，并从已有长度继续往下打印，看起来是「接着打」。
- **没有返回取消函数**。组件卸载时定时器仍在跑，会继续往已卸载的节点写内容；需要在卸载时中断的话，建议自己在 `onDone` 里判断，或直接改用 `rafTimeout` 自己实现。
- 每个字符间隔 `speed` 毫秒，长文本的耗时是 `字符数 × speed`，注意别传太大的字符串。
