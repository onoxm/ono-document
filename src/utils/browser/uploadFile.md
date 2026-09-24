# uploadFile

用 `XMLHttpRequest` 上传数据，自动按数据类型设置请求体与 `Content-Type`，并支持进度、超时与取消。

## 基础用法

```ts
import { uploadFile } from 'ono-react-element'

const formData = new FormData()
formData.append('file', file)

uploadFile('/api/upload', formData, {
  onProgress: percent => console.log(`已上传 ${percent.toFixed(0)}%`),
  onFinish: res => console.log('上传成功', res),
  onError: err => console.error('上传失败', err)
})
```

上传过程中取消：

```ts
const cancel = uploadFile('/api/upload', file, {
  onProgress: p => console.log(p),
  onFinish: res => console.log(res)
})

// 用户点了「取消上传」
cancel()
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|上传地址|<code>string</code>|-|是
data|上传数据|<code>FormData</code>\|<code>Record&lt;string, any&gt;</code>\|<code>ArrayBuffer</code>\|<code>Blob</code>\|<code>File</code>|-|是
options|配置项|<code>UploadOptions</code>|-|否

返回值|<code>() =&gt; void</code>（调用取消上传）
:- | :-

### UploadOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
headers|自定义请求头|<code>Record&lt;string, string&gt;</code>|-|否
timeout|超时时间（毫秒）|<code>number</code>|-|否
onProgress|上传进度（0 - 100）|<code>(progress: number) =&gt; void</code>|-|否
onFinish|上传成功回调，收到解析后的响应|<code>(res: any) =&gt; void</code>|-|否
onError|错误回调|<code>(error: Error \| Event) =&gt; void</code>|-|否

## 请求体的自动适配规则

| `data` 类型 | 请求体 | `Content-Type` |
| --- | --- | --- |
| `FormData` | 原样 | 由浏览器自动设置 multipart 边界（会**删除**你传的 `Content-Type`） |
| 普通对象 | `JSON.stringify` 的结果 | `application/json`（未显式指定时） |
| `Blob` / `File` | 原样 | 文件的 `type`，取不到时 `application/octet-stream` |
| `ArrayBuffer` / 其它 | 原样 | `application/octet-stream` |

## 注意事项

- 走的是 **XHR 而不是 fetch**，这正是它能拿到上传进度、并能真正 `abort` 的原因；也因此**不会自动带 Cookie 之外的同源策略差异**，跨域时后端仍需正确配置 CORS。
- **成功回调只在 HTTP 2xx 时触发**。响应体默认按 JSON 解析，解析失败时会退化成 `{ raw: responseText }` 交给你，不会抛错。
- **主动取消（调用返回的函数）不会触发 `onError`**，这是有意设计的，不要指望在错误回调里处理「用户取消」。
- `JSON.stringify` 失败时**不会发起请求**（比如对象里含循环引用），此时只走 `onError`，并返回一个**空函数**作为取消函数（调用它没有副作用）。
- 超时依赖 `options.timeout`，不传则用浏览器默认（通常不超时）。
- 进度来自 `xhr.upload.onprogress`，`e.total` 为 0 时进度按 0 上报；服务端返回响应阶段的耗时不体现在这个进度里。
