import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// axios.get('http://localhost:8090').then((res) => {
//   app.config.globalProperties.$config = res.data
// })
// export const globals = app.config.globalProperties
