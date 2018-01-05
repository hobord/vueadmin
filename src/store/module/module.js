import * as actions from './actions'
import mutations from './mutations'

const ModuleNameStore = {
  namespaced: true,
  subStore: 'ModuleNameStore',
  prefix: 'ModuleNameStore/',
  state: {
  },
  getters: {
  },
  actions,
  mutations
}

export default ModuleNameStore

