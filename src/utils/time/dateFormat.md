# dateFormat

把两位数字的「日」格式化成指定语言的可读字符串。

## 基础用法

```ts
dateFormat('01', 'en') // '1st'
dateFormat('22', 'en') // '22nd'
dateFormat('15', 'cn') // '十五日'
```

英文加序数后缀，中文用「几日」的形式：

```ts
import { dateFormat } from 'ono-react-element'

dateFormat('03', 'en') // '3rd'
dateFormat('31', 'cn') // '三十一日'
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
date|两位数字的日期字符串，如 <code>'01'</code>、<code>'15'</code>|<code>string</code>|-|是
language|目标语言，<code>'en'</code> 为英文、<code>'cn'</code> 为中文|<code>LanguageType</code>|-|是

返回值|<code>string</code>
:- | :-

## 注意事项

- 入参期望是**两位数字字符串**。传单个数字（`'5'`）时行为不一致：英文走 `Number()` 兜底得到 `'5th'`，中文则**原样返回 `'5'`**（不报错），所以中文调用前务必先 `padZero`。
- 英文序数后缀只对 `01`/`02`/`03` 与 `21`/`22`/`23`/`31` 做了特判，其余统一为 `${Number(date)}th`；`11`/`12`/`13` 会正确得到 `11th`/`12th`/`13th`。
- 中文映射表覆盖 `01` ~ `31`，超出范围（如 `'00'`、`'32'`）时**原样返回输入字符串**，不做校验。
- 它是 `localFormat` 的内部辅助函数，日常格式化日期时间更推荐直接用 `localFormat`。
