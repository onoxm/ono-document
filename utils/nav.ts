export const nav = [
  { text: 'Home', link: '/' },
  {
    text: 'Docs',
    activeMatch: '/docs/',
    items: [
      { text: '快速开始', link: '/docs/quickstart' },
      { text: 'components', link: '/comps/elements/button' },
      { text: 'hooks', link: '/hooks/useClickOutSide' },
      { text: 'utils', link: '/utils/common/chainClassNames' }
    ]
  },
  { text: 'Examples', link: '/examples/markdown-examples' }
]
