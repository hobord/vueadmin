import * as types from './mutation-types'

const mutations = {
  [types.SET_PAGINATION] (state, param) {
    state[param.paginator_name] = param.value
  }
}

export default mutations
