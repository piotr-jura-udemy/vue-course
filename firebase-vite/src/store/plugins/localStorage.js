const KEY = "vuex-storage";

export const localStoragePlugin = (store) => {
  store.replaceState(
    Object.assign(store.state, JSON.parse(window.localStorage.getItem(KEY)))
  );

  store.subscribe((mutation, state) => {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  });
};
