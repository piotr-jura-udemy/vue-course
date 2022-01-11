const state = () => ({
  rate: 1.14
})
const mutations = {
  setRate(state, payload) {
    state.rate = payload
  }
}
export default {
  state,
  mutations
}