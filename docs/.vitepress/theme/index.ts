import DefaultTheme from 'vitepress/theme'
// import HUI from '../../../src/entry'
import './style/var.css'
export default {
  extends: DefaultTheme,
  //发布在github page，地址是<username>.github.io/h-ui-plus
  base: '/h-ui-plus/',
  // enhanceApp(ctx) {
    // register your custom global components
    // ctx.app.component('JSButton', JSButton)
    // ctx.use(HUI)
  // }
}