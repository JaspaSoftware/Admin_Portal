import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { Icon } from '@iconify/vue';

createApp(App).component('Icon',Icon).mount('#app')
