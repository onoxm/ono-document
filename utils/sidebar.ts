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
                    // { text: 'Modal 弹窗', link: '/comps/modal' },
                    // { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Modules',
                collapsed: true,
                items: [
                    // { text: 'Modal 弹窗', link: '/comps/modal' },
                    // { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Tools',
                collapsed: true,
                items: [
                    { text: 'AutoSliderList 自动滑块', link: '/comps/autoSliderList' },
                    { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
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
                    { text: 'useDefer', link: '/hooks/useDefer' },
                    { text: 'useEventListener', link: '/hooks/useEventListener' },
                    { text: 'useGlobalClickListener', link: '/hooks/useGlobalClickListener' },
                ]
            }
        ],
    '/utils/':
        [
            {
                text: 'Utils',
                items: [
                    { text: 'colorUtils', link: '/utils/colorUtils' },
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
