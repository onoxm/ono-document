# copyText

把文本写入剪贴板。

## 基础用法

```tsx
import { copyText } from 'ono-react-element'

function App() {
  const handleCopy = async () => {
    await copyText('要复制的内容')
    alert('已复制')
  }

  return <button onClick={handleCopy}>复制</button>
}

export default App;
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
text|需要复制的文本|<code>string</code>|-|是

返回值|<code>Promise&lt;void&gt;</code>
:- | :-

## 注意事项

- 直接返回 `navigator.clipboard.writeText` 的结果，**失败时是 reject 而不是抛错**，记得 `await` 并 `catch`（常见失败原因：页面不是 HTTPS 或 localhost、用户未授权剪贴板权限、页面不在前台）。
- 没有内置「复制成功」的提示，需要自己接后续 UI 反馈。
- 反过来从剪贴板读取用 `pasteText`。
