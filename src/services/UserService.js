let querystring = require('querystring')
import Vue from 'vue'

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
