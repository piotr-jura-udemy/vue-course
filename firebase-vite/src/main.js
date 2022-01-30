import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import { addProject } from "./firebase"

const app = createApp(App);
// addProject()
app.config.unwrapInjectedRef = true;
app.use(store);
app.mount("#app");
