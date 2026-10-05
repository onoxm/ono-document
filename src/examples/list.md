# 列表与分页

`List` 渲染当前页的数据，`Pagination` 负责切页，`Popconfirm` 在删除前做一次二次确认，`message` 提示删除结果。

## 完整示例

```tsx
import { useState } from 'react'
import {
  Button,
  List,
  Pagination,
  Popconfirm,
  message
} from 'ono-react-element'

const PAGE_SIZE = 5

const ALL_USERS = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`
}))

function App() {
  const [users, setUsers] = useState(ALL_USERS)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE))
  const currentPageUsers = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleRemove = (id: number) => {
    const next = users.filter(user => user.id !== id)
    setUsers(next)
    // 删掉最后一条后当前页可能超出范围，回退到最后一页
    const maxPage = Math.max(1, Math.ceil(next.length / PAGE_SIZE))
    if (page > maxPage) setPage(maxPage)
    message.success('已删除')
  }

  return (
    <div style={{ width: 480 }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <List list={currentPageUsers} fallback={<li>暂无数据</li>}>
          {user => (
            <li
              key={user.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              <span>{user.name}</span>
              <Popconfirm
                title={`确定删除「${user.name}」吗？`}
                content="删除后无法恢复"
                okText="删除"
                cancelText="再想想"
                onConfirm={() => handleRemove(user.id)}
              >
                <Button type="danger" plain>
                  删除
                </Button>
              </Popconfirm>
            </li>
          )}
        </List>
      </ul>

      <Pagination
        total={totalPages}
        currentPage={page}
        onChange={setPage}
        hiddenPrevBtnOnFirstPage
        hiddenNextBtnOnLastPage
      />
    </div>
  )
}

export default App;
```

## 组件是怎么配合的

**`Pagination` 的 `total` 是总页数，不是总条数。** 这是最容易踩的坑：23 条数据、每页 5 条，要传的是 `5`（`Math.ceil(23 / 5)`），传 23 会得到 23 页。

**`List` 不产生容器元素。** 它只返回循环渲染的结果，外层的 `<ul>` 和子项的 `<li>` 都由你自己写；`List` 每个子元素记得带上 `key`。

**`fallback` 的判定依据是「过滤后的结果为空」。** 当前页没有数据时就会显示「暂无数据」，不需要额外写判断。

**删除后要处理页码回退。** 如果最后一页只剩一条，删掉之后那一页就不存在了；不把 `page` 收回来，列表会变成空白。示例里用 `Math.max(1, ...)` 兜住了「全部删光」的情况。

**`Popconfirm` 的浮层会自动落到 `body`。** 所以即使列表容器带 `overflow`，确认框也不会被裁掉；它的 `children` 建议传单个元素，组件会注入 ref 用来定位。

**`onConfirm` 可以返回 Promise。** 换成真实请求时，只要让 `onConfirm` 返回这个 Promise，确认按钮会自动转成 loading 并在请求期间禁止重复点击，等请求落定才关闭；被拒绝时浮层**不会**关闭，可以在原地重试。
