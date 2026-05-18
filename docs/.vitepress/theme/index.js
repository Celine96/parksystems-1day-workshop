import DefaultTheme from 'vitepress/theme'
import './custom.css'
import SectionTitle from './components/SectionTitle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SectionTitle', SectionTitle)
  }
}
