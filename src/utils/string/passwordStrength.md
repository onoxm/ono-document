# passwordStrength

密码强度的校验正则。

## 基础用法

```ts
const input = document.querySelector('input')

passwordStrength.test('Abc12345!') // true
passwordStrength.test('abc12345') // false，缺少大写字母与特殊字符
```

配合表单校验：

```ts
const validate = (value: string) => {
  if (!passwordStrength.test(value)) {
    return '密码需至少 8 位，且包含数字、大小写字母和特殊字符'
  }
  return null
}
```

## API

它本身是一个**正则表达式**（`RegExp`），不是函数，用 `.test()` 校验：

参数|说明|类型|默认值|是否必填
:- | :- | :- | :- | :-
（待校验字符串）|<code>RegExp.test</code> 的入参|<code>string</code>|-|是

## 注意事项

- 要求同时满足：长度 ≥ 8、至少 1 个数字、1 个小写字母、1 个大写字母、1 个特殊字符。
- 特殊字符只认 `!@#$%^&*()_+` 这几个，**`-`、`.`、`~`、`?` 等不在白名单里**；而字符集 `[\da-zA-Z]` 也不含这些符号，所以密码里出现白名单之外的符号会直接判为不合格。
- 建议用 `.test()` 而不是 `.exec()`，后者带 `g` 标志时会记住 `lastIndex`；这个正则没有 `g`，但仍以 `.test()` 为主。
