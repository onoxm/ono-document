# checkStatusCode

按 HTTP 状态码触发成功或失败回调。

## 基础用法

```ts
checkStatusCode(200, {
  onSuccess: () => console.log('请求成功'),
  onFail: () => console.log('请求失败')
})
```

配合接口返回体做统一处理：

```ts
const res = await fetch('/api/user')

checkStatusCode(res.status, {
  onSuccess: () => console.log('拿到数据'),
  onFail: () => console.log('服务端出错了')
})
```

## API

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
statusCode|HTTP 状态码|<code>number</code>|-|是
options|回调配置|<code>{ onSuccess?: () =&gt; void; onFail?: () =&gt; void }</code>|-|是

### options

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
onSuccess|2xx 时触发|<code>() =&gt; void</code>|-|否
onFail|4xx 或 5xx 时触发|<code>() =&gt; void</code>|-|否

## 注意事项

- 判定方式是**看首位数字**：`2` 开头算成功，`4` / `5` 开头算失败。所以 `2`、`20` 这种非标准状态码也会被当成成功。
- 3xx 和其它不在上述范围的状态码**两个回调都不触发**，只在控制台打印一句 `未知状态码`。需要处理重定向时得在外部自己判断。
- 两个回调都是可选的，用 `?.()` 调用，不传就是静默跳过。
