import * as types from './mutation-types'

const mutations = {
  [types.SOME_MUTATTION] (state, param) {
    state.varname = param
  }
}

export default mutations
