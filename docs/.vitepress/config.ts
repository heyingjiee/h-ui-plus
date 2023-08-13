import { defineConfig } from 'vitepress'

import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'



export default defineConfig({
    title: 'Hello HUI',
    description: 'vue3组件库',
    themeConfig: {
        logo: 'https://heyingjiee.github.io/logo.png',
        nav: [
            { text: '指南', link: '/guide' },
            { text: '组件', link: '/components/Button.md' },
        ],
        search:{ provider: 'local' },
        sidebar:{
            //指定路径下的侧边栏。一个页面的侧边栏可以配置多个文章
            '/components/':[
                {
                    text:'基础组件',
                    collapsed: false,
                    items:[
                        {text:'按钮组件',link:'./Button.md'},
                        {text:'上传组件',link:'./Uploader.md'}
                    ]
                }
            ]
        },
        
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Hedaodao'
          }
        

    },
    markdown: {
        config: (md) => {
          md.use(demoblockPlugin)
        }
      },
      vite: {
        plugins: [demoblockVitePlugin()]
      }
})