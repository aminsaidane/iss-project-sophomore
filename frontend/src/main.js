import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import presistedState from "pinia-plugin-persistedstate"
const app = createApp(App)
const pinia= createPinia()

  

pinia.use(presistedState)
app.use(pinia)
app.use(router)
app.use(Toast)
app.mount('#app')
