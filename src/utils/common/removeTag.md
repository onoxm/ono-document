# removeTag

去掉字符串里的 HTML 标签，只留文本。

## 基础用法

```ts
removeTag('<p>你好 <strong>世界</strong></p>') // '你好 世界'
removeTag('<div>第一行</div><div>第二行</div>') // '第一行第二行'
removeTag('纯文本') // '纯文本'
```

典型用途：把富文本编辑器的内容转成纯文本做字数统计或摘要。

```ts
const plain = removeTag(richText)
const length = getStringRealLenght(plain)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
fragment|包含 HTML 标签的字符串|<code>string</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- 内部用 `DOMParser` 真正解析了一遍 HTML，取 `body.textContent`，所以**块级标签之间不会补换行或空格**，`<div>a</div><div>b</div>` 会拼成 `'ab'`。
- 解析过程**不会执行脚本**、不会发起请求，但字符串里的 `<img>`、`<br>` 等无文本的标签会直接消失。
- 需要 DOM 环境（`DOMParser` 属于浏览器 API），在 SSR / Node 里直接调用会报 `DOMParser is not defined`。
- 如果只是要防 XSS，请用专门的转义方案（如 `textContent` 赋值），不要依赖这个函数 —— 它是「取文本」，不是「清洗恶意内容」。
