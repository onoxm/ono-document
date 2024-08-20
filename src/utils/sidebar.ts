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
                text: 'Components',
                collapsed: true,
                items: [
                    { text: 'Modal 弹窗', link: '/comps/modal' },
                    { text: 'Pagination 分页', link: '/comps/pagination' },
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
