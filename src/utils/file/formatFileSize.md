# formatFileSize

把字节数格式化成带单位的可读文本。

## 基础用法

```ts
formatFileSize(0) // '0 B'
formatFileSize(512) // '512 B'
formatFileSize(1024) // '1 KB'
formatFileSize(1048576) // '1 MB'
```

保留小数位、或强制指定单位：

```ts
formatFileSize(1536, { decimalPlaces: 2 }) // '1.50 KB'
formatFileSize(5242880, { unit: 'MB' }) // '5 MB'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
size|文件字节数|<code>number</code>|-|是
options|格式化配置|<code>FormatFileSizeOptions</code>|-|否

### FormatFileSizeOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
unit|强制输出单位，不传则自动选择|<code>'B'</code>\|<code>'KB'</code>\|<code>'MB'</code>\|<code>'GB'</code>\|<code>'TB'</code>|-|否
decimalPlaces|保留的小数位数|<code>number</code>|<code>0</code>|否

## 注意事项

- **默认保留 0 位小数**，也就是会四舍五入：`1536` 得到 `'2 KB'` 而不是 `'1.5 KB'`。想要小数请显式传 `decimalPlaces`。
- 换算基数是 **1024**（二进制），不是 1000。
- 传了 `unit` 之后**不再自动升级**：`formatFileSize(1024, { unit: 'MB' })` 得到 `'0 MB'`，即使数值更适合用 KB 表达。
- 传了非法单位会**抛错**（`Error: Invalid unit`），单位字符串需要精确匹配大写形式。
- 自动选择单位时只升不降，`1073741824` 会一路升到 `'1 GB'`。
