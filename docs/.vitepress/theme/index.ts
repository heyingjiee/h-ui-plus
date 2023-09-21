import Theme from 'vitepress/theme'
import HUI from '../../../src/entry'
import './style/var.css'

export default {
  extends: Theme,
  enhanceApp({app}) {
    app.use(HUI)
  }
}