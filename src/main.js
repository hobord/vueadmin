// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'assets/style/main.scss'

import Vue from 'vue'
window.moment = window.moment || require('moment')

// Filters
Vue.filter('formatDate', function (value, format) {
  if (value) {
    return window.moment(String(value)).format(format)
  }
})

//  RxJS
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
Vue.use(VueRx, Rx)

// Shared Data store
import store from './store/index'
import Vuex from 'vuex'
Vue.use(Vuex)

// Axios
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

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

// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { routes } from './routes'
const router = new VueRouter({
  mode: 'history',
  routes
})

// GUI
import '../node_modules/vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import '../node_modules/vuetify/src/stylus/main.styl'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  render: h => h(App)
})
