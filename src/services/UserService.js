let querystring = require('querystring')
import Vue from 'vue'
import { EventBus } from 'src/eventBus'

let oauthUrl = document.head.querySelector('meta[name="oauth-url"]')
oauthUrl = (oauthUrl) ? oauthUrl.content : ''

let clientId = document.head.querySelector('meta[name="oauth-client-id"]')
clientId = (clientId) ? clientId.content : ''

let clientSecret = document.head.querySelector('meta[name="oauth-client-secret"]')
clientSecret = (clientSecret) ? clientSecret.content : ''

let apiUrl = document.head.querySelector('meta[name="api-url"]')
apiUrl = (apiUrl) ? apiUrl.content : ''

export const UserService = {
  authUser: function (auth) {
    Vue.axios.interceptors.response.use((response) => {
      return response
    }, function (error) {
      // Do something with response error
      if (error.response.status === 401) {
        EventBus.$emit('APP.LOGOUT_USER')
        console.log('unauthorized, logging out ...')
      }
      return Promise.reject(error.response)
    })

    return new Promise((resolve, reject) => {
      let data = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        scope: '',
        username: auth.email,
        password: auth.password
      }

      Vue.axios.post(oauthUrl, querystring.stringify(data))
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log('error ' + error)
        reject(error.response.data)
      })
    })
  },
  refreshToken: function (refreshToken) {
    return new Promise((resolve, reject) => {
      let data = {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        scope: '',
        refresh_token: refreshToken
      }

      Vue.axios.post(oauthUrl, querystring.stringify(data))
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          console.log('error ' + error)
          reject(error.response.data)
        })
    })
  },
  loadUser: function () {
    return new Promise((resolve, reject) => {
      Vue.axios.get(apiUrl + '/user')
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
        console.log('error ' + error)
      })
    })
  }
}
