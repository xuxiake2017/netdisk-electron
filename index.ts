import { createApp } from 'vue';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import App from './src/App.vue';
import './src/style/index.scss'
import './src/style/iconfont.js'


const app = createApp(App)
// app.use(ElementPlus)
app.mount('#app')