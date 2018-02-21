export default {
  setCurrent: ({ commit }, component) => {
    commit('setCurrent', component)
  },
  setUsgru: ({ commit }, component) => {
    commit('setUsgru', component)
  },
  setAses: ({ commit }, ases) => {
    commit('setAses', ases)
  }
}
