import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import globalMethods from '@/utils/globalMethods';

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App);

// element plus

app.use(ElementPlus)
app.use(createPinia())
app.use(router)


// Global Properties에 등록
Object.keys(globalMethods).forEach((method) => {
    app.config.globalProperties[`$${method}`] = globalMethods[method];
});

app.mount('#app')
