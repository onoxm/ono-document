# base64ToBlob

把 base64 字符串转换成 `Blob` 对象。

## 基础用法

```ts
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

const blob = base64ToBlob(base64)
```

拿到 `Blob` 后可以配合 `URL.createObjectURL` 预览：

```ts
const url = URL.createObjectURL(blob)
img.src = url
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
base64|base64 字符串，**必须带 data URL 前缀**|<code>string</code>|-|是

## 注意事项

- 入参必须形如 `data:image/png;base64,xxxx`。缺少前缀、或前缀里取不到 MIME 类型时会直接**抛错**（`Invalid base64 string` / `Could not extract MIME type from base64 string`），外部建议用 `try / catch` 包住。
- 生成的 `Blob` 的 `type` 取自前缀里的 MIME，例如 `data:image/jpeg;base64,` 得到 `image/jpeg`。
- 反过来转换用 `blobToBase64`。
