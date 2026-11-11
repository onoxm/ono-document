export const nav = [
  { text: 'Home', link: '/' },
  {
    text: 'Docs',
    activeMatch: '/docs/',
    items: [
      { text: '快速开始', link: '/docs/quickstart' },
      { text: 'components', link: '/comps/button' },
      { text: 'hooks', link: '/hooks/useClickOutSide' },
      { text: 'utils', link: '/utils/array/forEach' },
      { text: 'tools', link: '/tools/portalRenderer' },
      {
        text: 'Vite插件',
        link: 'https://onoxm.github.io/vite-plugin-auto-router/'
      },
      { text: 'Packages', link: '/packages/onoFetch' }
    ]
  },
  { text: 'Examples', link: '/examples/' }
]
