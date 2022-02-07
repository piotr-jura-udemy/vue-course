import { createStore } from "vuex";
// import { localStoragePlugin } from "./plugins/localStorage";
import application from "./modules/application";

const store = createStore({
  modules: {
    application,
  },
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  // plugins: [localStoragePlugin],
});

export default store;
