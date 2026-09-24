# getColorType

判断颜色字符串是十六进制还是 `rgb` 格式。

## 基础用法

```ts
getColorType('#fff') // 'hex'
getColorType('#ffffff') // 'hex'
getColorType('rgb(255,255,255)') // 'rgb'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
clr|待判断的颜色字符串|<code>string</code>|-|是

返回值|<code>'hex'</code>\|<code>'rgb'</code>\|<code>'unknown'</code>
:- | :-

## 注意事项

- **只认两类格式**：3 位或 6 位十六进制，以及不带空格的严格 `rgb(r, g, b)`。下面这些都会返回 `'unknown'`：
  - `rgba(255,255,255,0.5)`
  - `hsl(0, 0%, 100%)`
  - 8 位十六进制 `#ffffff80`
  - 带空格的 `# fff`
- 判定用的是整串匹配（`^...$`），字符串前后有多余空格或内容就会落到 `'unknown'`。
- 如果只是要判断「是不是合法颜色」，用 `isValidColor`；这里的返回值可以直接当分支依据。
