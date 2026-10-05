# 抽屉表单

用 `Drawer` 承载表单，在浮层里编辑一条数据，底部放操作按钮，`toast` 给出保存反馈。

## 完整示例

```tsx
import { useState } from 'react'
import {
  Button,
  Drawer,
  OnoInput,
  OnoSelect,
  OnoTextarea,
  toast
} from 'ono-react-element'

function App() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [desc, setDesc] = useState('')

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('标题不能为空')
      return
    }
    // 换成真实请求即可
    toast.success('已保存')
    setOpen(false)
  }

  return (
    <div style={{ width: 480 }}>
      <Button onClick={() => setOpen(true)}>编辑资料</Button>

      {open && (
        <Drawer
          title="编辑资料"
          footer={close => (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button onClick={close}>取消</Button>
              <Button type="success" onClick={handleSave}>
                保存
              </Button>
            </div>
          )}
          drawerClose={() => setOpen(false)}
        >
          <div
            style={{
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            <OnoInput
              value={title}
              placeholder="标题"
              onChange={e => setTitle(e.target.value)}
            />

            <OnoSelect
              placeholder="请选择状态"
              options={[
                { label: '草稿', value: 'draft' },
                { label: '已发布', value: 'published' }
              ]}
              onChange={value => setStatus(value)}
            />

            <OnoTextarea
              showCount
              maxLength={200}
              autoSize={{ minRows: 4, maxRows: 8 }}
              value={desc}
              placeholder="描述"
              onChange={e => setDesc(e.target.value)}
            />
          </div>
        </Drawer>
      )}
    </div>
  )
}

export default App;
```

## 组件是怎么配合的

**抽屉自己不会挂载和卸载。** `drawerClose` 是必填的，但它只负责「请求关闭」——真正把抽屉移除的是使用方，所以要用受控渲染：`{open && <Drawer />}`。

**`footer` 是函数槽位。** 传函数时会拿到 `drawerClose`，直接调它关抽屉即可（组件会先播完离场动画再移除）。

**抽屉里的下拉浮层会自动落到抽屉内部。** `OnoSelect` 的浮层默认挂 `document.body`，但检测到触发元素在 `Drawer` 里时会改挂进该抽屉容器 —— 否则会被遮罩盖住。这一点不需要额外配置。

**`OnoTextarea` 的 `showCount` 要配合 `maxLength`。** 单传 `showCount` 不会显示计数条；`autoSize` 与 `resize` 同时传时以 `autoSize` 为准。

**`toast` 与 `message` 的区别在层叠方式。** `message` 的新提示追加在下方，`toast` 的新提示插在最上方、并且没有 `info` 与关闭按钮。这里用 `toast` 只是为了把两个反馈组件都覆盖到，换成 `message` 同样可以。

**点遮罩和按 Esc 默认都会关闭抽屉。** 想避免「填到一半误关」，可以传 `maskClickClose={false}` 与 `escClose={false}`。
