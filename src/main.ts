import { createApp } from 'vue'
import '@vant/touch-emulator';
import 'lib-flexible';
import pinia from '@/store'
import router from '@/router'
import App from './App.vue'
import { Lazyload, setToastDefaultOptions } from 'vant';

// Toast
import { setDialogDefaultOptions } from 'vant';
import { changeTitle } from '@/utils';
import MyButtom from '@/components/MyButton/MyButton.vue';
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
setToastDefaultOptions({
  position: 'bottom'
})

app.component('MyButtom', MyButtom);
app.mount('#app')

router.beforeEach((to, from, next) => {
  changeTitle(to.meta.title as string);
  next();
});
