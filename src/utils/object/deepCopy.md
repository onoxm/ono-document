# deepCopy

深拷贝对象或数组，返回完全独立的新引用。

## 基础用法

```ts
const source = { a: 1, nested: { b: 2 }, list: [1, 2, 3] }

const copy = deepCopy(source)
copy.nested.b = 100

source.nested.b // 2，原对象不受影响
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
value|需要深拷贝的值|<code>T</code>|-|是

返回值|<code>T</code>
:- | :-

## 注意事项

- 只对**普通对象和数组**做递归复制，其余类型按下面的规则处理：
  - `null` 与原始类型（`string` / `number` / `boolean` / `undefined`）原样返回；
  - `Date`、`Map`、`Set`、`RegExp`、类实例会被当成普通对象遍历属性，**类型信息丢失**（`Date` 会变成 `{}`），要保留这些类型请用 `structuredClone`；
  - 函数作为属性时按引用复制，不会克隆函数体。
- **不支持循环引用**，对象自引用会导致无限递归。
- 只复制对象**自有**属性（用 `Object.hasOwn` 判断），原型链上的属性不会被带过去，属性描述符（getter / setter）也会退化成一个普通值。
