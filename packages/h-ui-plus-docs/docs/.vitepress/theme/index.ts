import Theme from 'vitepress/theme'
import HUI from 'h-ui-plus-components/dist/h-ui'
import 'h-ui-plus-components/dist/entry.css'
import './style/var.css'

export default {
  extends: Theme,
  enhanceApp({app}) {
    app.use(HUI)
  }
}