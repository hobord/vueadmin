import Vue from 'vue'
export const ExmpleService = new Vue({
  methods: {
    list: function (pagination, search = null) {
      return new Promise((resolve, reject) => {
        let apiUrl = '/api/example'

        if (pagination) {
          apiUrl = apiUrl + '/?page=' + pagination.page
          apiUrl = apiUrl + '&per_page=' + pagination.rowsPerPage
          apiUrl = apiUrl + '&short_by=' + pagination.sortBy
          apiUrl = apiUrl + '&descending=' + pagination.descending
          apiUrl = apiUrl + '&search=' + search
        }

        this.axios.get(apiUrl).then((response) => {
          resolve(response.data)
        }).catch(function (error) {
          console.log(error.response.data)
          reject(error.response.data)
        })
      })
    }
  }
})

