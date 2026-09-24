# urlToFile

请求一个 URL，把响应体转成 `File` 对象。

## 基础用法

```ts
const file = await urlToFile('https://example.com/logo.png')

const formData = new FormData()
formData.append('file', file)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
url|资源地址|<code>string</code>|-|是

返回值|<code>Promise&lt;File&gt;</code>
:- | :-

## 注意事项

- 文件名用的是 `blobToFile` 的默认值 **`abc.jpg`**，并且**没有参数可以改**。要自定义名字请自己走一遍：
  ```ts
  const file = new File([await urlToFile(url)], 'logo.png')
  ```
- 内部是 `blobToFile(urlToBlob(url))`，所以同样**不检查响应状态**，404 时你会得到一个内容是错误页的「图片」文件。
- 跨域资源受 CORS 限制。
- 文件名的后缀与实际类型可能不符（PNG 内容配 `.jpg` 名字），上传到对后缀敏感的服务端时要注意。
