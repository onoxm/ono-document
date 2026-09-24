# singleton

把类变成单例，保证全局只拿到同一个实例。

## 基础用法

```ts
import { singleton } from 'ono-react-element'

class Store {
  count = 0
}

const SingleStore = singleton(Store)

const a = new SingleStore()
const b = new SingleStore()

a === b // true，拿到的是同一个实例
a.count = 10
b.count // 10
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
className|需要变成单例的类|<code>new (...args: any[]) =&gt; any</code>|-|是

返回值|包装后的类（类型与原类一致）
:- | :-

## 注意事项

- 单例**按类缓存**，缓存存在 `WeakMap` 里。同一个类重复调用 `singleton` 会返回同一个包装结果，不同类互不影响。
- 只有**第一次构造**时传的参数生效，后续 `new` 传的参数会被忽略。

  ```ts
  const A = singleton(Store)
  new A('第一次') // 参数生效
  new A('第二次') // 参数被丢弃，仍返回第一次的实例
  ```

- 用 `Proxy` 拦截了 `construct`，因此**静态属性访问、`instanceof` 判断**仍然指向原类，但 `SingleStore.name` 之类会拿到 Proxy 的表现，需要精确的类名时用原始类。
- 每个类只能有一个实例：适合全局配置、连接池这类场景，不适合需要多份独立状态的对象。
