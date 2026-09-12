import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'
import { useSettingsStore } from './stores/settings'
import { i18n } from './i18n'
import "./style.css"

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n)

const settingsStore = useSettingsStore(pinia)
settingsStore.initializeTheme()
settingsStore.initializeMotionPreference()
settingsStore.initializeCardOpacity()

app.mount('#app')
