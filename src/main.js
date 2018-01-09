// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'assets/style/main.scss'

import Vue from 'vue'
window.moment = window.moment || require('moment')

// Filters  s
Vue.filter('formatDate', function (value, format) {
  if (value) {
    return window.moment(String(value)).format(format)
  }
})

import { store, router, apolloProvider } from './vendor'

import ServicesPlugin from './services/index'
Vue.use(ServicesPlugin)

import App from './App'

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  render: h => h(App)
})

