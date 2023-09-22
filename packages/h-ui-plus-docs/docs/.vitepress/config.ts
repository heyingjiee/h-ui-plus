import { defineConfig } from 'vitepress'
export default defineConfig({
    //发布在github page，地址是<username>.github.io/h-ui-plus
    base: '/h-ui-plus/',
    title: 'Hello HUI',
    description: 'vue3组件库',
    head: [['link', { rel: 'icon', href: 'https://heyingjiee.github.io/logo.png' }]],
    themeConfig: {
        logo: 'https://heyingjiee.github.io/logo.png',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/heyingjiee/h-ui-plus' }
          ],
        nav: [
            { text: '指南', link: '/guide' },
            { text: '组件', link: '/components/Button.md' },
        ],
        search: { provider: 'local' },
        sidebar: {
            //指定路径下的侧边栏。一个页面的侧边栏可以配置多个文章
            '/components/': [
                {
                    text: '基础组件',
                    collapsed: false,
                    items: [
                        { text: '按钮组件', link: './Button.md' },
                        { text: '上传组件', link: './Uploader.md' }
                    ]
                }
            ]
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Hedaodao'
        }


    },

})