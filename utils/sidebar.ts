export const sidebar = {
    '/docs/':
        [
            {
                text: 'Document',
                collapsed: false,
                items: [
                    { text: '快速开始', link: '/docs/quickstart' },
                    { text: 'Prettierrc 配置', link: '/docs/prettierrc' },
                ]
            }
        ],
    '/comps/':
        [
            {
                text: 'Elements',
                collapsed: true,
                items: [
                    { text: 'Card3D 3D卡片', link: '/comps/card3d' },
                    // { text: 'Modal 弹窗', link: '/comps/modal' },
                    // { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Modules',
                collapsed: true,
                items: [
                    { text: 'Avatar Crop 头像裁剪', link: '/comps/avatarCrop' },
                    // { text: 'Pagination 分页', link: '/comps/pagination' },
                ]
            },
            {
                text: 'Tools',
                collapsed: true,
                items: [
                    { text: 'AutoSliderList 自动滑块', link: '/comps/autoSliderList' },
                    // { text: 'AutoCenterXscroll 自动滑块', link: '/comps/autoCenterXscroll' },
                    { text: 'Modal 弹窗', link: '/comps/modal' },
                    { text: 'Pagination 分页', link: '/comps/pagination' },
                    { text: 'Xscroll 滚动条', link: '/comps/xscroll' },
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
                    { text: 'useGetElementSize', link: '/hooks/useGetElementSize' },
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