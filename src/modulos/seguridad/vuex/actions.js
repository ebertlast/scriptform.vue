export default {
  setUsu: ({ commit }, usu) => {
    commit('setUsu', usu)
  },
  initUsu: ({ commit }) => {
    commit('initUsu')
  },
  setToken: ({ commit }, token) => {
    // alert(token)
    commit('setToken', token)
  },
  clearUsu: ({ commit }) => {
    commit('clearUsu')
  }
}
