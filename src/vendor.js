window.moment = window.moment || require('moment')
window._ = window._ || require('lodash')

import Vue from 'vue'

// Eventbus
Vue.prototype.$eventbus = new Vue()

// Cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Shared Data store
import store from './store/index'
import Vuex from 'vuex'
Vue.use(Vuex)
export { store }

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let token = document.head.querySelector('meta[name="csrf-token"]')
if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
}

import ServicesPlugin from './services/index'
Vue.use(ServicesPlugin)

// RxJS
// import Rx from 'rxjs/Rx'
// import VueRx from 'vue-rx'
// Vue.use(VueRx, Rx)

// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
var APOLLO_ENDPOINT = 'https://www.graphqlhub.com/graphql'
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: APOLLO_ENDPOINT
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    // apollo options applied to all components that are using apollo
    $loadingKey: 'apolloLoading'
  }
})
export { apolloProvider }

// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { routes } from './routes'
const router = new VueRouter({
  mode: 'history',
  routes
})
export { router }

// GUI
import '../node_modules/vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import '../node_modules/vuetify/src/stylus/main.styl'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
