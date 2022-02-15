import { SET_ONLY_PENDING } from "./../mutation-types";

const state = () => ({
  onlyPending: false,
});

const mutations = {
  [SET_ONLY_PENDING](state, payload) {
    state.onlyPending = payload;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
