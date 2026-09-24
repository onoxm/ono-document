# urlToBase64

请求一个 URL，把响应体转成 base64 字符串。

## 基础用法

```ts
const base64 = await urlToBase64('https://example.com/logo.png')

// 结果不带 data: 前缀
img.src = `data:image/png;base64,${base64}`
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|资源地址|<code>string</code>|-|是

返回值|<code>Promise&lt;string&gt;</code>（**不含** data URL 前缀）
:- | :-

## 注意事项

- 内部是 `blobToBase64(urlToBlob(url))`，所以继承了这两个函数的行为：**不检查响应状态**、**不带 data URL 前缀**、**没有错误处理**。
- 跨域资源需要对方允许 CORS。
- 这是浏览器里的常见做法，但在 Web 上「把图片转 base64」还需要注意体积放大（约 1.37 倍）；如果只是要显示图片，直接用原始 URL 更省内存。
- 需要带前缀的完整结果时，自己拼 `data:image/png;base64,` 或改用 `fileToBase64`。
