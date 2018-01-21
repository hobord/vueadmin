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
      content: ''
      // tinymceOptions: {
      //   plugins: [
      //     'advlist autolink lists link image charmap print preview hr anchor pagebreak',
      //     'searchreplace wordcount visualblocks visualchars code fullscreen',
      //     'insertdatetime media nonbreaking save table contextmenu directionality',
      //     'emoticons template paste textcolor colorpicker textpattern'
      //   ],
      //   toolbar1: 'styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media link image | print preview',
      //   toolbar2: '',
      //   other_options: {
      //     menubar: 'edit insert view format table tools help',
      //     height: 600,
      //     paste_data_images: true,
      //     image_advtab: true,
      //     file_picker_callback: function (callback, value, meta) {
      //       // if (meta.filetype === 'image') {
      //       //   document.getElementById('upload').click()
      //       //   document.getElementById('upload').addEventListener('change', function () {
      //       //     var file = this.files[0]
      //       //     var reader = new FileReader()
      //       //     reader.onload = function (e) {
      //       //       callback(e.target.result, {
      //       //         alt: ''
      //       //       })
      //       //     }
      //       //     reader.readAsDataURL(file)
      //       //   })
      //       // }
      //     },
      //     templates: [{
      //       title: 'Test template 1',
      //       content: 'Test 1'
      //     }, {
      //       title: 'Test template 2',
      //       content: 'Test 2'
      //     }]
      //   }
      // }
    }),
    watch: {
      loading: function (newLoading) {
        if (newLoading !== 0) {
          this.$eventbus.$emit('APP.SHOW_LOADER')
        } else {
          this.$eventbus.$emit('APP.HIDE_LOADER')
        }
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
      }
    },
    mounted () {
      console.log('Component mounted.')
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

