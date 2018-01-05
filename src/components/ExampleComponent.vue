<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Component (Hacker News)</div>

          <div class="panel-body">
            <i class="fas fa-user"></i><br>
            {{stateVar}}
            <div v-if="hn">
              <ul>
                <li v-for="item in hn.topStories" :key="item.url">
                  <a :href="item.url" target="_blank">
                    {{item.title}}
                  </a>
                </li>
              </ul>
            </div>
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
        @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import Query from '../apollo/hnews.gql'

  export default {
    // Local state
    data: () => ({
      loading: 0
    }),
    // Apollo GraphQL
    apollo: {
      // Local state 'posts' data will be updated
      // by the GraphQL query result
      hn: {
        // GraphQL query
        query: Query,
        variables: {
          qty: 5
        },
        // Will update the 'loading' attribute
        // +1 when a new query is loading
        // -1 when a query is completed
        loadingKey: 'loading'
        // Polling query
        // pollInterval: 300, // ms
      }
    },
    computed: {
      stateVar: {
        get () {
          return this.$store.state.stateVar
        }
      }
    },
    mounted () {
      console.log('Component mounted.')
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

