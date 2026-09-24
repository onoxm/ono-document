# getContrastColor

根据背景色返回对比度更高的文字颜色（`#000` 或 `#fff`）。

## 基础用法

```ts
getContrastColor('#ffffff') // '#000'
getContrastColor('#000000') // '#fff'
getContrastColor('#fff') // '#000'，支持 3 位简写
getContrastColor('rgb(200, 200, 200)') // '#000'
```

配合动态主题色给文字挑颜色：

```ts
const textColor = getContrastColor(themeColor) ?? '#000'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
backgroundColor|背景色，支持 hex（3 位或 6 位）与 rgb|<code>string</code>|-|是

返回值|<code>'#000'</code>\|<code>'#fff'</code>\|<code>null</code>
:- | :-

## 注意事项

- 判据是标准亮度公式 `(r*299 + g*587 + b*114) / 1000`，**严格大于 128** 才返回 `#000`。`#808080` 的亮度正好等于 128，所以返回的是 `#fff`。
- 颜色格式不被识别时（如 `hsl(...)`、`rgba(...)`、`red` 这类关键字）返回 **`null`**，不是抛错，也不是回退成黑或白——调用方需要自己处理这个空值。
- 只支持 `#` 开头和 `rgb` 开头的字符串。
