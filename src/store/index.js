import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  // storage: window.localStorage
  storage: window.sessionStorage
})

const debug = false // process.env.NODE_ENV !== 'production'

import ModuleNameStore from './module/module'
import AppMessages from './app_messages/app_messages'
import Paginators from './paginators/paginators'
import Tinymce from './tinymce/tinymce'

const store = () => new Vuex.Store({
  strict: debug,
  modules: {
    ModuleNameStore,
    AppMessages,
    Paginators,
    Tinymce
  },
  state: {
    auth_data: {},
    user: {},
    stateVar: 'example vuex store data'
  },
  actions: {
//   $GET_PROJECTS: ({ commit, state, rootState }) => {
//     return rootState.apollo.watchQuery({
//       query: gql`
//           query projectsList{
//             projects {
//               _id
//               name
//             }
//           }
//         `,
//     }).subscribe({
//       next: (resulut) => {
//         const projects = resulut.data.projects || [];
//         commit('SET_PROJECTS', projects)
//       },
//       error: (error, done) => {
//         console.log('there was an error sending the query', error);
//       }
//     });
//   },
  },
  mutations: {
    SET_AUTH_DATA (state, data) {
      state.auth_data = data
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  getters: {
    auth_header: state => {
      return 'Bearer '.concat(state.auth_data.access_token)
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
