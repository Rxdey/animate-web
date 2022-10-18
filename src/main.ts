import { createApp } from 'vue'
import '@vant/touch-emulator';
import 'lib-flexible';
import pinia from '@/store'
import router from '@/router'
import App from './App.vue'


// const env = import.meta.env

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
