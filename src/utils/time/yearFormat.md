# yearFormat

把年份按指定语言格式化。

## 基础用法

```ts
yearFormat('2026', 'en') // '2026'
yearFormat('2026', 'cn') // '二零二六'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
year|年份字符串，如 <code>'2026'</code>|<code>string</code>|-|是
language|目标语言，<code>'en'</code> 为英文、<code>'cn'</code> 为中文|<code>LanguageType</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- 中文是**逐位**转换（`'1990'` → `'一九九零'`），不是数值读法（不会是「一千九百九十」）。
- 英文原样返回阿拉伯数字，不做任何处理。
- 逐位映射只覆盖 `0` ~ `9`；输入含非数字字符时，对应位会得到 `undefined` 并被 `join('')` 拼成字面的 `undefined`，调用前请确保是纯数字字符串。
- 它是 `localFormat` 的内部辅助函数，日常格式化日期时间更推荐直接用 `localFormat`。
