# convertSecondToOtherTime

把秒数换算成其它时间单位的整数值。

## 基础用法

```ts
convertSecondToOtherTime(90000, 'day') // 1
convertSecondToOtherTime(90000, 'hour') // 25
convertSecondToOtherTime(90000, 'minute') // 1500
convertSecondToOtherTime(90000, 'second') // 90000
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
seconds|待转换的秒数|<code>number</code>|-|是
type|目标单位|<code>TimeUnitType</code>|-|是

### TimeUnitType

类型值|说明|换算基数
:- | :- | :-
<code>year</code>|年|365 天
<code>month</code>|月|30 天
<code>day</code>|日|24 小时
<code>hour</code>|小时|60 分钟
<code>minute</code>|分钟|60 秒
<code>second</code>|秒|1

## 注意事项

- **年是按 365 天、月是按 30 天**的固定系数换算的，不是真实日历。`convertSecondToOtherTime(31536000, 'year')` 得到 1，但这个「1 年」和自然年不完全等价（闰年会差一天）。
- 结果是**向下取整**的整数，不足一个单位的部分被丢弃（90000 秒 = 1.04 天 → 1）。
- `type` 传不在表里的值会**抛错** `Error: Invalid type.`（注意错误信息里的提示文案只列了 day / hour / minute / second，实际 year、month、second 也是合法的）。
- 反向换算（把年/月/日拼回秒数）没有提供，需要自己做乘法。
