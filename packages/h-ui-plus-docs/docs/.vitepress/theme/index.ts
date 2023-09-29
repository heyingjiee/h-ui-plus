import Theme from 'vitepress/theme'
import HUI from 'h-ui-plus-components'
import 'h-ui-plus-components/dist/index.css'
import './style/var.css'

export default {
  extends: Theme,
  enhanceApp({app}) {
    app.use(HUI)
  }
}