export const nav = [
    { text: 'Home', link: '/' },
    {
        text: 'Docs',
        activeMatch: '/docs/',
        items: [
            { text: '快速开始', link: '/docs/quickstart' },
            { text: '我的组件', link: '/comps/modal' },
            { text: '我的hooks', link: '/hooks/useEventListener' },
        ]
    },
    { text: 'Examples', link: '/examples/markdown-examples' }
]
