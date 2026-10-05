# 组合场景示例

组件文档回答的是「这个组件怎么用」，这一组页面回答的是「几个组件怎么拼成一个能用的界面」。

每个场景都是一份完整代码：从状态、布局一直写到操作完成后的反馈，可以整段复制进项目再按需修改。

## 场景列表

| 场景 | 用到的组件 | 主题 |
| :- | :- | :- |
| [表单提交](/examples/form) | <code>OnoInput</code> · <code>OnoSelect</code> · <code>Switch</code> · <code>Checkbox</code> · <code>Button</code> · <code>message</code> | 收集输入、提交前校验、提交中 loading、成功后提示 |
| [列表与分页](/examples/list) | <code>List</code> · <code>Pagination</code> · <code>Popconfirm</code> · <code>Button</code> · <code>message</code> | 只渲染当前页、切页、删除前二次确认、删空后回退页码 |
| [抽屉表单](/examples/drawer) | <code>Drawer</code> · <code>OnoInput</code> · <code>OnoSelect</code> · <code>OnoTextarea</code> · <code>Button</code> · <code>toast</code> | 浮层里放表单、底部操作栏、保存反馈 |

## 关于这里的代码

- 代码按组件库的真实 API 编写，`import` 的包名就是安装后的实际包名。
- 为了把注意力留在组件搭配上，示例里的「请求」都用 `setTimeout` 模拟；换成真实接口时只要替换那一小段。
- 布局用的是内联样式，不依赖任何 CSS 框架，复制后可以直接跑。
- 组件各自的完整参数表不在这些页面里，需要时从上面对应的组件文档查。
