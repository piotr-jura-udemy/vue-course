import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from "vuex"
import store from "./store/index"

const app = createApp(App)
app.use(createStore(store))
app.mount('#app')
