# scaleSize

按最大宽高限制等比缩放尺寸，返回缩放后的宽高。

## 基础用法

```ts
scaleSize(2000, 1000) // { initWidth: 1000, initHeight: 500 }
scaleSize(2000, 3000, { maxWidth: 800, maxHeight: 800 }) // { initWidth: 533, initHeight: 800 }
```

不让小图被拉伸时记得关掉放大：

```ts
scaleSize(500, 400, { allowUpscale: false }) // { initWidth: 500, initHeight: 400 }
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
width|原始宽度|<code>number</code>|-|是
height|原始高度|<code>number</code>|-|是
options|限制配置|<code>ScaleSizeOptions</code>|-|否

### ScaleSizeOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
maxWidth|最大宽度|<code>number</code>|<code>1000</code>|否
maxHeight|最大高度|<code>number</code>|<code>1000</code>|否
allowUpscale|是否允许放大|<code>boolean</code>|<code>true</code>|否

## 注意事项

- `allowUpscale` 默认是 `true`，含义是「**总是把较长的那条边撑到对应的最大值**」，不是「保持原样的同时允许放大」：
  ```ts
  scaleSize(500, 400) // { initWidth: 1000, initHeight: 800 }
  ```
  比限制还小的尺寸会被**放大**到限制的边界。如果不希望图片被拉大，必须显式传 `{ allowUpscale: false }`。
- `allowUpscale: false` 时，原始尺寸已在限制内会**原样返回**（不缩放），超出限制才等比缩小。
- 宽高比始终不变，返回的数值做了 `Math.round`，可能有一像素误差。
- 只算出数值，不修改任何样式，需要自己交给组件或 CSS。
