import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(store)
app.use(router)
app.mount("#app")
