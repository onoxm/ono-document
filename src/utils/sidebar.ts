export const sidebar = {
    '/docs/':
        [
            {
                text: 'Document',
                collapsed: false,
                items: [
                    { text: '快速开始', link: '/docs/quickstart' },
                ]
            }
        ],
    '/comps/':
        [
            {
                text: 'Elements',
                collapsed: true,
                items: [
                    { text: 'Modal 弹窗', link: '/comps/modal' },
                    { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Modules',
                collapsed: true,
                items: [
                    { text: 'Modal 弹窗', link: '/comps/modal' },
                    { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Tools',
                collapsed: true,
                items: [
                    { text: 'Modal 弹窗', link: '/comps/modal' },
                    { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            }
        ],
    '/hooks/':
        [
            {
                text: 'Hooks',
                items: [
                    { text: 'useEventListener', link: '/hooks/useEventListener' },
                ]
            }
        ],
    '/examples/':
        [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/examples/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/examples/api-examples' }
                ]
            }
        ]
}
