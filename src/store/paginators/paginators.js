import * as actions from './actions'
import mutations from './mutations'

const Paginators = {
  namespaced: true,
  subStore: 'Paginators',
  prefix: 'Paginators/',
  state: {
    Reports: {
      filters: {
        text: '',
        show_our: true,
        id: null,
        gid: null,
        matchType: null
      },
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'id',
        totalItems: 0
      }
    }
  },
  getters: {},
  actions,
  mutations
}

export default Paginators

