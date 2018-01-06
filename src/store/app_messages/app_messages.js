import * as actions from './actions'
import mutations from './mutations'

const AppMessages = {
  namespaced: true,
  subStore: 'AppMessages',
  prefix: 'AppMessages/',
  state: {
    messages: []
  },
  getters: {
    count: function (state) {
      return state.messages.length
    }
  },
  actions,
  mutations
}

export default AppMessages

