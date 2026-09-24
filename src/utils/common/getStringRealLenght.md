# getStringRealLenght

按 Unicode 字形簇统计字符串的真实字符数，正确处理 emoji 等多字节字符。

## 基础用法

```ts
getStringRealLenght('hello') // 5
getStringRealLenght('中文') // 2
getStringRealLenght('👍') // 1
getStringRealLenght('a👍b') // 3
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
str|原始字符串|<code>string</code>|-|是

返回值|<code>number</code>
:- | :-

## 注意事项

- 用的是 `Intl.Segmenter` 的**字形簇**分段，所以 `'👍'` 记 1 而不是 2（`str.length` 会得到 2），带肤色修饰符或 ZWJ 组合的 emoji 也按 1 个整体计算。
- 它衡量的是「视觉上几个字符」，**不等于服务端按字节或码点算出的长度限制**。要限制提交长度时请以接口的口径为准。
- 函数名中的 `Lenght` 是源码里的拼写（正确拼写为 `Length`），import 时按实际导出名写。
- 依赖 `Intl.Segmenter`，老版本浏览器可能不支持，需要自己兜底。
