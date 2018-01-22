<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Grid Component</div>
          <div class="panel-body">
            <v-data-table
            v-bind:headers="table.headers"
            :hide-actions="false"
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

            <v-layout>
              <v-spacer></v-spacer>
              <v-select
                v-bind:items="table.rowsPerPage"
                v-model="pagination.rowsPerPage"
                single-line
                style="max-width:65px"
                bottom
              ></v-select>
              <div class="text-xs-center pt-2">
                <v-pagination
                  v-model="pagination.page"
                  :length="pages"
                  :total-visible="9"></v-pagination>
              </div>
              <v-text-field
                v-model.number.lazy.trim="pagination.page"
                mask="#####"
                prefix="page:"
                single-line
                style="max-width: 80px;"
                @keyup.up="pagination.page++"
                @keyup.down="pagination.page = (pagination.page>1)? pagination.page-1: 1"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-layout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data: () => ({
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
    computed: {
      // Table pages caculator
      pages () {
        if (this.pagination.rowsPerPage === null ||
          this.table.totalItems == null
        ) return 0
        return Math.ceil(this.table.totalItems / this.pagination.rowsPerPage)
      }
    },
    created () {
      // Load table filter and pagination data from store
      let p = JSON.parse(JSON.stringify(this.$store.state.Paginators))
      this.pagination = p.Reports.pagination
      this.filters = p.Reports.filters
    },
    mounted () {
      this.getReport()
    },
    methods: {
      getReport: function () {
        let that = this
        this.axios('/static/paginated.json').then(function (result) {
          that.table.items = result.data.data
          that.table.totalItems = 100
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
