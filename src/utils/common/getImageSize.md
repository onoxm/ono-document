# getImageSize
获取图片尺寸

## 示例
```ts
const image = 'https://picsum.photos/100/100'

await getImageSize(image) // { width: 100, height: 100 }
```

## 参数
参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
image|图片元素|<code>string</code>\|<code>Blob</code>\|<code>File</code>|-|是
