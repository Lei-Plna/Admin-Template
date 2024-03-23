import { createApp } from 'vue'
import App from './App.vue'
import { createRouterPlugin } from './router'

const app = createApp(App);
createRouterPlugin(app);
app.mount('#app')
