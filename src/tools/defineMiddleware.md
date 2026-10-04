# defineMiddleware

声明一个自定义中间件：在写操作前后插入逻辑，或附加一个 `rehydrate` 恢复函数。

## 基础用法

中间件是「`api => next => action => ...`」的三段式，`next(action)` 把动作交给下一环：

```ts
import { defineGlobalState, defineMiddleware } from 'ono-react-element'

const loggerMiddleware = () =>
  defineMiddleware(api => next => action => {
    console.log('dispatching', action)
    const result = next(action)
    console.log('next state', api.getState())
    return result
  })

export const useUser = defineGlobalState({ name: '' }, [loggerMiddleware()])
```

## 声明恢复逻辑

把状态存进任意介质，并让 store 在定义时就恢复它：

```ts
import { defineMiddleware } from 'ono-react-element'

const sessionMiddleware = defineMiddleware(
  () => next => action => next(action),
  {
    rehydrate: () => {
      const stored = sessionStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    }
  }
)
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
middleware|中间件函数|<code>Middleware&lt;T&gt;</code>|-|是
options|可选配置|<code>DefineMiddlewareOptions&lt;T&gt;</code>|-|否

### DefineMiddlewareOptions

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
rehydrate|返回要合并进初始状态的片段；返回 <code>null</code> 表示不恢复|<code>() =&gt; T</code>\|<code>() =&gt; null</code>|-|否

### Middleware

中间件收到的 `api` 提供读当前值与转发动作两项能力：

字段|说明|类型
:- | :- | :-
getState|读当前完整状态|<code>() =&gt; T</code>
dispatch|把动作转发出去（等价于调用 <code>next</code>）|<code>(action: Action&lt;T&gt;) =&gt; void</code>

中间件收到的 `action` 形如 `{ type: 'setState', data }`，其中 `data` 与 `setState` 的入参同形（部分字段或 updater 函数）。

## 注意事项

- `rehydrate` 在**定义时执行一次**（模块求值期），结果按 `{ ...initData, ...rehydrated }` 合并 —— 它会**覆盖**同名字段的初始值；也不会按 Provider 实例各跑一次。
- 多个中间件**按数组顺序**包在写入口外：数组里靠前的先看到动作，`next()` 返回时先看到结果。
- ⚠️ 不要指望在工厂函数体（`middleware(api)` 那一段）里调用 `api.dispatch`：那一刻中间件链还没拼好，调用会被**静默忽略**（不会绕过链直接落到 store）。工厂体只适合做「定义时」的事，例如 `persistMiddleware` 的首次播种。
- 写操作只有 `setState` 一个入口，所以中间件看到的 `action.type` 恒为 `'setState'`。
- 库**不内置日志中间件**：要观察 action 流，用本函数自己写几行即可，而且在业务代码里写的 `console.log` 不受库产物的 `dropConsole` 影响。
