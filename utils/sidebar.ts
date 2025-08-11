export const sidebar = {
  '/docs/': [
    {
      text: 'Document',
      // collapsed: false,
      items: [
        { text: '快速开始', link: '/docs/quickstart' },
        { text: 'Prettierrc 配置', link: '/docs/prettierrc' },
        { text: '主题切换', link: '/docs/theme' }
      ]
    }
  ],
  '/comps/': [
    {
      text: 'Elements',
      collapsed: false,
      items: [
        { text: 'Button 按钮', link: '/comps/elements/button' },
        { text: 'Card3D 3D卡片', link: '/comps/elements/card3d' },
        { text: 'Checkbox 多选框', link: '/comps/elements/checkbox' },
        // { text: 'Input 输入框', link: '/comps/elements/input' },
        { text: 'MenuButton 菜单按钮', link: '/comps/elements/menuButton' },
        { text: 'Radio 单选框', link: '/comps/elements/radio' },
        { text: 'Switch 开关', link: '/comps/elements/switch' }
      ]
    },
    {
      text: 'Modules',
      collapsed: false,
      items: [
        { text: 'Avatar Crop 头像裁剪', link: '/comps/modules/avatarCrop' },
        // { text: 'Select 下拉选择', link: '/comps/modules/select' },
        { text: 'VirtualList 虚拟列表', link: '/comps/modules/virtualList' },
        { text: 'Waterfall 瀑布流', link: '/comps/modules/waterfall' }
      ]
    },
    {
      text: 'Tools',
      collapsed: false,
      items: [
        {
          text: 'AutoSliderList 自动滑块',
          link: '/comps/tools/autoSliderList'
        },
        // { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
        { text: 'AwaitList 异步列表循环', link: '/comps/tools/awaitList' },
        { text: 'List 列表循环', link: '/comps/tools/list' },
        { text: 'Message 消息提示', link: '/comps/tools/message' },
        { text: 'Modal 弹窗', link: '/comps/tools/modal' },
        { text: 'Pagination 分页', link: '/comps/tools/pagination' },
        { text: 'Popover 气泡卡片', link: '/comps/tools/popover' },
        { text: 'Popconfirm 气泡确认框', link: '/comps/tools/popconfirm' },
        {
          text: 'PortalRenderer 命令式Dom',
          link: '/comps/tools/portalRenderer'
        },
        // { text: 'Toast 提示框', link: '/comps/tools/toast' },
        // { text: 'TemplateDialog 模板弹窗', link: '/comps/tools/templateDialog' },
        // { text: 'Tooltip 提示框', link: '/comps/tools/tooltip' },
        { text: 'Xscroll 滚动组件', link: '/comps/tools/xscroll' }
      ]
    }
  ],
  '/hooks/': [
    {
      text: 'Hooks',
      items: [
        { text: 'useCountdown', link: '/hooks/useCountdown' },
        { text: 'useClickOutSide', link: '/hooks/useClickOutSide' },
        { text: 'useDefer', link: '/hooks/useDefer' },
        { text: 'useEventListener', link: '/hooks/useEventListener' },
        { text: 'useFullScreen', link: '/hooks/useFullScreen' },
        { text: 'useGetElementSize', link: '/hooks/useGetElementSize' },
        { text: 'useGlobalData', link: '/hooks/useGlobalData' },
        { text: 'useKeypress', link: '/hooks/useKeypress' },
        { text: 'useReactive', link: '/hooks/useReactive' },
        { text: 'useTheme', link: '/hooks/useTheme' },
        { text: 'useUpdate', link: '/hooks/useUpdate' }
      ]
    }
  ],
  '/utils/': [
    {
      text: 'Utils',
      items: [
        { text: 'colorUtils', link: '/utils/colorUtils' },
        { text: 'themeUtils', link: '/utils/themeUtils' },
        { text: 'fullScreen', link: '/utils/fullScreen' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/examples/markdown-examples' },
        { text: 'Runtime API Examples', link: '/examples/api-examples' }
      ]
    }
  ]
}
