import { default as actions } from './actions'
import { default as getters } from './getters'
import { default as mutations } from './mutations'
import { default as states } from './states'
export const store = {
  actions,
  getters,
  mutations,
  state: states
}
