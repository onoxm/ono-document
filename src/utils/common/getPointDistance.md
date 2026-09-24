# getPointDistance

计算二维平面上两点之间的欧氏距离。

## 基础用法

```ts
getPointDistance(0, 0, 3, 4) // 5
getPointDistance(0, 0, 1, 1) // 1.4142135623730951
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
x1|第一个点的横坐标|<code>number</code>|-|是
y1|第一个点的纵坐标|<code>number</code>|-|是
x2|第二个点的横坐标|<code>number</code>|-|是
y2|第二个点的纵坐标|<code>number</code>|-|是

返回值|<code>number</code>
:- | :-

## 注意事项

- 返回的是**浮点数**，不是整数；做比较时不要用严格相等。
- 只支持二维坐标，不需要开方只要比较远近时可以自己算平方值，省一次 `Math.sqrt`。
