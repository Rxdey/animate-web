import { createApp } from 'vue'
import '@vant/touch-emulator';
import 'lib-flexible';
import pinia from '@/store'
import router from '@/router'
import App from './App.vue'
import { Lazyload } from 'vant';

// Toast
import { setDialogDefaultOptions } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import '@/assets/css/reset.less';
import '@/assets/css/common.less';



// const env = import.meta.env

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Lazyload, {
    lazyComponent: true,
    loading: 'src/assets/img/default.png',
    error: 'src/assets/img/default.png'
  });
  setDialogDefaultOptions({
    theme: 'round-button',
  });
app.mount('#app')
