import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from '@/router';
import '@/assets/font/iconfont.js'
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// const app = createApp(App)

const app = createApp(App);
app.use(router);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
