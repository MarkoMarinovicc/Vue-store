import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './store/theme'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const themeStore = useThemeStore()
// @ts-ignore
themeStore.loadThemeFromLocalStorage()

if (!localStorage.getItem('theme')) {
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  // @ts-ignore
  themeStore.setTheme(preferredTheme)
}

app.mount('#app')
