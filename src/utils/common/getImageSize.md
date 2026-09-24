# getImageSize

获取图片的宽高尺寸，支持传入图片 URL、`Blob` 或 `File`。

## 基础用法

```ts
const image = 'https://picsum.photos/100/100'

const { width, height } = await getImageSize(image) // { width: 100, height: 100 }
```

本地选择的文件也能直接传进来：

```ts
const input = document.querySelector('input[type="file"]')

input?.addEventListener('change', async e => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const { width, height } = await getImageSize(file)
  console.log(`${width} x ${height}`)
})
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
image|图片资源|<code>string</code>\|<code>Blob</code>\|<code>File</code>|-|是

返回值|<code>Promise&lt;{ width: number; height: number }&gt;</code>
:- | :-

## 注意事项

- 传 `Blob` / `File` 时内部会 `URL.createObjectURL`，加载完成或失败后**自动 `revokeObjectURL`**，不需要手动释放。
- 图片加载失败时 Promise 会 **reject**（`Failed to load image`），务必自己接 `catch`，否则会产生未处理的 rejection。
