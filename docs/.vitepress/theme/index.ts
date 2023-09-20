import DefaultTheme from 'vitepress/theme'
import "unocss";
import HUI from '../../../src/entry'
import './style/var.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    console.log(ctx)
    // register your custom global components
    // ctx.app.component('JSButton', JSButton)
    ctx.app.use(HUI)
  }
}