import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { Icon } from '@iconify/vue'
import store from './store'


const app = createApp(App)
app.component('Icon', Icon)
app.use(router)
app.mount('#app')
app.use(store)