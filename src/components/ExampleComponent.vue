<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Component (Hacker News)</div>
          <div class="panel-body">
            <b><a href="https://next.vuetifyjs.com/components/alerts" target="_blank">Look the components here!</a><br></b>
            Example fa icon:<i class="fas fa-user"></i><br>
            Example shared store variable value: "{{stateVar}}"<br>
            <v-btn @click.native="addMessage()">Add message</v-btn>
            <v-btn @click.native="showToast()">Show Toast</v-btn>
            <v-btn @click.native="showDialog()">Show Dialog</v-btn>
            <v-btn @click.native="showLoader()">Show Loader</v-btn>
            <br>
            <h2>Hacker news, loaded by GraphQL</h2>
            <div v-if="hn">
              <ul>
                <li v-for="item in hn.topStories" :key="item.url">
                  <a :href="item.url" target="_blank">
                    {{item.title}}
                  </a>
                </li>
              </ul>
            </div>
            <br><br>
            <v-data-table
            v-bind:headers="table.headers"
            :hide-actions="true"
            :items="table.items"
            :pagination.sync="pagination"
            :rows-per-page-items="table.rowsPerPage"
            :total-items="table.totalItems"
            class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.userId }}</td>
                <td>{{ props.item.title }}</td>
              </template>
            </v-data-table>

            <br><br>

            <tinymce
              id="tinymceeditor"
              v-model="content"
              :toolbar1="tinymceOptions.toolbar1"
              :toolbar2="tinymceOptions.toolbar2"
              :plugins="tinymceOptions.plugins"
              :other_options="tinymceOptions.other_options"
            ></tinymce>
          </div>
        </div>
      </div>
    </div>
    <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click.native="addMessage()"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import Query from '../apollo/hnews.gql'
  import tinymce from 'src/components/TinimceVue.vue'

  export default {
    components: {
      tinymce
    },
    data: () => ({
      loading: 0,

      // Editor content
      content: '',

      // Table properties
      pagination: {},
      filters: {},
      table: {
        rowsPerPage: [5, 10, 15, 20, 30, 50, 100],
        totalItems: 0,
        headers: [
          {
            text: 'Id',
            align: 'left',
            sortable: true,
            value: 'id'
          },
          { text: 'user ID', value: 'userId' },
          { text: 'Title', value: 'title' }
        ],
        items: []
      }

    }),
    watch: {
      loading: function (newLoading) {
        if (newLoading !== 0) {
          this.$eventbus.$emit('APP.SHOW_LOADER')
        } else {
          this.$eventbus.$emit('APP.HIDE_LOADER')
        }
      },
      // Watch the paginator of table to save into the store
      pagination: {
        handler: function (val, oldVal) {
          this.$store.commit('Paginators/SET_PAGINATION', {
            paginator_name: 'Reports',
            value: {
              filters: JSON.parse(JSON.stringify(this.filters)), // Query filter
              pagination: JSON.parse(JSON.stringify(val)) // Pagination settings
            }
          })
          this.getReport()
        },
        deep: true
      }
    },
    // Apollo GraphQL
    apollo: {
      // Local state 'posts' data will be updated
      // by the GraphQL query result
      hn: {
        // GraphQL query
        query: Query,
        variables: {
          qty: 10
        },
        // Will update the 'loading' attribute
        // +1 when a new query is loading
        // -1 when a query is completed
        loadingKey: 'loading'
        // Polling query
        // pollInterval: 2000 // ms
      }
    },
    computed: {
      stateVar: {
        get () {
          return this.$store.state.stateVar
        }
      },
      tinymceOptions: function () {
        let options = JSON.parse(JSON.stringify(this.$store.state.Tinymce.default))
        return options
      },
      pages () {
        if (this.table.pagination.rowsPerPage == null ||
          this.table.totalItems == null
        ) return 0

        return Math.ceil(this.table.totalItems / this.table.pagination.rowsPerPage)
      }
    },
    mounted () {
      console.log('Component mounted.')
      this.getReport()
    },
    methods: {
      addMessage: function () {
        this.$store.commit('AppMessages/ADD_MESSAGE', {
          icon: 'info',
          title: 'Message title: ' + window.moment().toISOString(),
          subTitle: 'Amet eiusmod aliqua deserunt quis. ',
          text: 'Anim dolore veniam cillum pariatur veniam. Non magna officia elit consequat eiusmod tempor. Enim excepteur ad enim incididunt. Ad duis exercitation occaecat velit est ipsum. Ad magna magna ut aliquip duis. Ad dolor duis eiusmod qui fugiat ea laboris quis.'
        })
        this.$eventbus.$emit('APP.BOTTOM_MESSAGES.SHOW')
      },
      showToast: function () {
        this.$eventbus.$emit('APP.TOAST.SHOW', {
          text: 'Here is an example text of Toast',
          color: 'red'
        })
      },
      showDialog: function () {
        this.$eventbus.$emit('APP.DIALOG.SHOW', {
          title: 'Dialog title',
          content: 'Here is an example text of dialog box'
        })
      },
      showLoader: function () {
        this.$eventbus.$emit('APP.LOADER.SHOW')
        setTimeout(() => {
          this.$eventbus.$emit('APP.LOADER.HIDE')
        }, 1500)
      },
      getReport: function () {
        let that = this
        this.axios('/api/posts').then(function (result) {
          that.table.items = result.data
        })
        // this.$services.ReportService.list({
        //   pagination: this.pagination,
        //   filters: this.filters
        // }).then(response => {
        //   this.loading =  0
        //   this.table.items = response.data;
        //   this.table.totalItems = response.total;
        // }).catch(error => {
        //   this.$eventbus.$emit('APP.SHOW_TOAST', {
        //     text: 'Error happened! (ReportService.list)',
        //     color: 'red'
        //   })
        //   this.loading =  0
        //   console.log(error)
        // })
      }
    }
  }
</script>

<style lang="sass" scoped>
@import "../assets/style/_variables.scss";
li
  list-style-type: circle;

  a
    color: $example-primary-color;
</style>

