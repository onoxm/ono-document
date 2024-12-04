import { defineConfig } from 'vitepress'
import { nav, sidebar, socialLinks } from '../utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'ONO的在线文档库',
  description: 'A VitePress Site',
  srcDir: './src',
  base: '/ono-document/',
  // locales,

  head: [['link', { rel: 'icon', href: '/ono-document/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    outlineTitle: '本页导航',
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks,
    footer: {
      copyright: 'Copyright © 2024-present ONO'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
