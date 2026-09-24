# urlToBlob

请求一个 URL，把响应体转成 `Blob`。

## 基础用法

```ts
const blob = await urlToBlob('https://example.com/logo.png')

const url = URL.createObjectURL(blob)
img.src = url
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|资源地址|<code>string</code>|-|是

返回值|<code>Promise&lt;Blob&gt;</code>
:- | :-

## 注意事项

- **不检查响应状态**：源站返回 404 / 500 时不会抛错，你会得到一个装着错误页面内容的 Blob。需要严格校验请自己用 `fetch` + `response.ok`。
- 受同源策略与 CORS 限制：跨域资源需要对方允许，否则 `fetch` 会直接 reject。
- 拿到的 Blob 的 `type` 由响应的 `Content-Type` 决定；服务端没给对类型时，后续转 base64 或当图片渲染都可能失败。
- 返回的 Blob 不涉及 blob URL，不需要 `revokeObjectURL`（但你自己 `createObjectURL` 出来的那个要释放）。
