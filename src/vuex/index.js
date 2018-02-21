import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { default as actions } from './actions'
import { default as getters } from './getters'
import { default as mutations } from './mutations'
import { default as states } from './states'

// #region Módulos
import { default as seguridad } from '../modulos/seguridad'
import { default as principal } from '../modulos/principal'
// console.log(principal)
// #endregion
export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: states,
  modules: {
    seguridad: seguridad.store,
    principal: principal.store
  }
})
