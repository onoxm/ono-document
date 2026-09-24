# base64ToFile

把 base64 字符串转换成 `File` 对象，可直接用于上传。

## 基础用法

```ts
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

// 只传文件名，不含扩展名
const file = base64ToFile(base64, 'avatar') // avatar.png
```

拿到 `File` 后可以直接塞进 `FormData`：

```ts
const formData = new FormData()
formData.append('file', base64ToFile(base64, 'avatar'))
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
base64|base64 字符串，**必须带 data URL 前缀**|<code>string</code>|-|是
filename|文件名，**不含扩展名**|<code>string</code>|-|是

## 注意事项

- 扩展名由 MIME 自动追加，`filename` 里**不要**自己写后缀，否则会得到 `avatar.png.png` 这样的名字。
- 映射规则：`image/jpeg` 写成 `.jpg`，其余按 MIME 的子类型直接拼接（如 `image/webp` → `.webp`）。
- 入参格式不合法时直接**抛错**，建议用 `try / catch` 包住。
- `lastModified` 取当前时间，不是原文件的修改时间。
