# 表单提交

把输入类组件拼成一个表单：`OnoInput` 收文本、`OnoSelect` 选角色、`Switch` 控制开关、`Checkbox` 做勾选确认，`Button` 负责提交，`message` 负责把结果告诉用户。

## 完整示例

```tsx
import { useState } from 'react'
import {
  Button,
  Checkbox,
  OnoInput,
  OnoSelect,
  Switch,
  message
} from 'ono-react-element'

function App() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!name.trim()) {
      message.warning('请先填写用户名')
      return
    }
    if (!role) {
      message.warning('请选择角色')
      return
    }
    if (!agreed) {
      message.warning('请先同意服务条款')
      return
    }

    setSubmitting(true)
    // 换成真实请求即可
    setTimeout(() => {
      setSubmitting(false)
      message.success(`用户「${name}」已创建`)
    }, 1200)
  }

  return (
    <div
      style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <OnoInput
        clearable
        value={name}
        placeholder="用户名"
        onChange={e => setName(e.target.value)}
        onClear={() => setName('')}
      />

      <OnoSelect
        placeholder="请选择角色"
        options={[
          { label: '管理员', value: 'admin' },
          { label: '编辑', value: 'editor' },
          { label: '访客', value: 'guest' }
        ]}
        onChange={value => setRole(value)}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={enabled} onChange={setEnabled} />
        <span>创建后立即启用</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox
          id="agree"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
        />
        <label htmlFor="agree">我已阅读并同意服务条款</label>
      </div>

      <Button loading={submitting} onClick={handleSubmit}>
        创建用户
      </Button>
    </div>
  )
}

export default App;
```

## 组件是怎么配合的

**校验放在提交处，而不是每个输入框上。** 三个 `if` 依次检查，`message.warning` 提示完就 `return`，用户改完再点一次即可。

**`OnoSelect` 是非受控的，必须自己接住 `onChange`。** 它没有 `value` 属性，只有 `defaultValue` 作为初始值；不在 `onChange` 里把选中值存进 state，提交时就拿不到用户选了什么。

**受控输入 + `clearable` 要自己处理清空。** `OnoInput` 传了 `value` 就是受控的，点清除按钮只会触发 `onClear`、不会改值，所以要在 `onClear` 里把 `name` 置空。

**`Checkbox` 的 label 要自己关联。** 组件只渲染方块本身，文字需要用 `<label htmlFor="...">` 配一个和 `id` 相同的值。

**提交中的禁用交给 `loading`。** `Button` 进入 loading 时会自动一并禁用，不需要再传 `disabled`，也不会被重复点击。

**`message` 挂在 `document.body` 上。** 不受表单布局影响，所以哪怕这段表单后来被搬进弹窗或抽屉，提示一样能正常显示在页面顶部。
