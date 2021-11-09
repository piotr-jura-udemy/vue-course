import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tasks: [
        {
          id: 1,
          description: "Buy food for the dog",
          priority: false,
          done: false,
        },
        {
          id: 2,
          description: "Pay the bills",
          priority: true,
          done: false,
        },
        {
          id: 3,
          description: "Buy some computer games",
          priority: false,
          done: false,
        },
        {
          id: 4,
          description: "Go to the gym",
          priority: false,
          done: false,
        },
      ],
    };
  },
  getters: {},
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload);
    },
  },
});

export default store;
