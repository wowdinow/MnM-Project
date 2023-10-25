// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId:
    '978757603852-tot1ol9q3sr555n13dhts7oith2k7u3s.apps.googleusercontent.com',
})

app.mount('#app')
