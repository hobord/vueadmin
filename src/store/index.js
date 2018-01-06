import Vuex from 'vuex'
// import axios from 'axios'
// const util = require('util')
const debug = process.env.NODE_ENV !== 'production'

import ModuleNameStore from './module/module'
import AppMessages from './app_messages/app_messages'

const store = () => new Vuex.Store({
// export default  store = new Vuex.Store({
  modules: {
    ModuleNameStore,
    AppMessages
  },
  state: {
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
  mutations: {},
  getters: {},
  strict: debug
  // plugins: debug ? [createLogger()] : []
})

export default store
