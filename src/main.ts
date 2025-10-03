import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import usePlugins from './plugins/app'

const app = createApp(App);

usePlugins(app);
app.mount('#app')