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
      // collapsed: true,
      items: [
        { text: 'Button 按钮', link: '/comps/button' },
        { text: 'Card3D 3D卡片', link: '/comps/card3d' },
        { text: 'Checkbox 多选框', link: '/comps/checkbox' },
        { text: 'Radio 单选框', link: '/comps/radio' }
      ]
    },
    {
      text: 'Modules',
      // collapsed: true,
      items: [{ text: 'Avatar Crop 头像裁剪', link: '/comps/avatarCrop' }]
    },
    {
      text: 'Tools',
      // collapsed: true,
      items: [
        { text: 'AutoSliderList 自动滑块', link: '/comps/autoSliderList' },
        // { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
        { text: 'List 列表循环', link: '/comps/list' },
        { text: 'Modal 弹窗', link: '/comps/modal' },
        { text: 'Pagination 分页', link: '/comps/pagination' },
        { text: 'Xscroll 滚动组件', link: '/comps/xscroll' }
      ]
    }
  ],
  '/hooks/': [
    {
      text: 'Hooks',
      items: [
        { text: 'useDefer', link: '/hooks/useDefer' },
        { text: 'useTheme', link: '/hooks/useTheme' },
        { text: 'useUpdate', link: '/hooks/useUpdate' },
        { text: 'useKeypress', link: '/hooks/useKeypress' },
        { text: 'useReactive', link: '/hooks/useReactive' },
        { text: 'useCountdown', link: '/hooks/useCountdown' },
        { text: 'useFullScreen', link: '/hooks/useFullScreen' },
        { text: 'useGlobalData', link: '/hooks/useGlobalData' },
        { text: 'useEventListener', link: '/hooks/useEventListener' },
        { text: 'useGetElementSize', link: '/hooks/useGetElementSize' },
        {
          text: 'useGlobalClickListener',
          link: '/hooks/useGlobalClickListener'
        }
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
