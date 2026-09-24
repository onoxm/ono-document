# pasteText

从剪贴板读取文本，并在拿到内容后回调。

## 基础用法

```tsx
import { pasteText } from 'ono-react-element'

function App() {
  const handlePaste = async () => {
    await pasteText(text => {
      console.log('剪贴板内容：', text)
    })
  }

  return <button onClick={handlePaste}>粘贴</button>
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onResolve|读取到文本后的回调|<code>(text: string) =&gt; void</code>|-|是

返回值|<code>Promise&lt;void&gt;</code>
:- | :-

## 注意事项

- 返回的是 `navigator.clipboard.readText()` 的 Promise，读取结果是**通过回调传出来的**，不通过 `await` 的返回值；`await` 只能拿到 `undefined`，所以业务逻辑要写在 `onResolve` 里。
- 读取剪贴板属于敏感权限，**必须由用户手势触发**（点击等），且要求 HTTPS 或 localhost；被拒绝时 Promise 会 reject，记得 `catch`。
- 只有文本，读不到图片等其它类型的内容。
