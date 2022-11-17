import { createApp } from 'vue'

import App from './App.vue'

// const config = JSON.parse(import.meta.env['VITE_SORRYBOOK_CONFIG'])
// await Promise.all(config.css?.map((css_path) => import(css_path)))

const app = createApp(App)

app.mount('#app')
