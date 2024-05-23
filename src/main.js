import { createApp } from 'vue'
import App from './App.vue'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import './assets/index.css'
import './assets/weather-icons-128.css'
import './assets/weather-icons-64.css'

const app = createApp(App).use(mdiVue, {
  icons: mdijs,
})
app.mount('#app')
