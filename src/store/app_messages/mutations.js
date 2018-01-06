import * as types from './mutation-types'

const mutations = {
  [types.ADD_MESSAGE] (state, param) {
    state.messages.push(param)
  },
  [types.DELETE_MESSAGE] (state, index) {
    state.messages.splice(index, 1)
  }
}

export default mutations
