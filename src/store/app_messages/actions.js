import * as types from './mutation-types'

export const ADD_MESSAGE = ({ commit, state }, param) => {
  commit(types.ADD_MESSAGE, param)
}

