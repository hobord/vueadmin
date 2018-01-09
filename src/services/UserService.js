let querystring = require('querystring')
import Vue from 'vue'

export const UserService = {
  authUser: function (auth) {
    return new Promise((resolve, reject) => {
      let data = {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'cCedcFqdWYN1FGXKpQcfN1zMYb1Lqv7MiYKKH1Mf',
        scope: '',
        username: auth.email,
        password: auth.password
      }

      Vue.axios.post('http://192.168.99.100:8080/oauth/token', querystring.stringify(data))
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
      Vue.axios.get('/api/user')
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
