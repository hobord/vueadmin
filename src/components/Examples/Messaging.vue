<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Components for messaging system</div>
          <div class="panel-body">
            <b><a href="https://next.vuetifyjs.com/components/alerts" target="_blank">Look the components here!</a><br></b>
            Example fa icon:<i class="fas fa-user"></i><br>
            Example shared store variable value: "{{stateVar}}"<br>
            <v-btn @click.native="addMessage()">Add message</v-btn>
            <v-btn @click.native="showToast()">Show Toast</v-btn>
            <v-btn @click.native="showDialog()">Show Dialog</v-btn>
            <v-btn @click.native="showLoader()">Show Loader</v-btn>
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
  export default {
    data: () => ({
      loading: 0
    }),
    watch: {
      // Loader indicator
      loading: function (newLoading) {
        if (newLoading !== 0) {
          this.$eventbus.$emit('APP.SHOW_LOADER')
        } else {
          this.$eventbus.$emit('APP.HIDE_LOADER')
        }
      }
    },
    computed: {
      stateVar: {
        get () {
          return this.$store.state.stateVar
        }
      }
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
@import "~src/assets/style/_variables.scss";
li
  list-style-type: circle;

  a
    color: $example-primary-color;
</style>

