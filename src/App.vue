<template>
    <v-app id="app">
      <v-navigation-drawer
          v-if="loggedin"
          fixed
          hide-overlay
          :mini-variant.sync="mini"
          clipped
          app
          v-model="drawer">
        <v-list dense>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <!-- <img src="/images/avatar.png" /> -->
              <v-icon>android</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action @click.stop="mini = !mini">
              <v-btn icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile v-for="item in menuItems" :key="item.title" :to=item.properties.route>
            <v-list-tile-action>
              <v-icon>{{ item.properties.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/test">
            <v-list-tile-action>
              <v-icon>android</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Test
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Logout
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-navigation-drawer>


      <v-toolbar app class="indigo darken-4" dark v-if="loggedin">
        <v-toolbar-side-icon @click.native="drawer = !drawer" v-if="!drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Admin:</v-toolbar-title>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item
              v-for="item in breadcrumbs"
              :key="item.name"
              :to="item.path"
          >
            {{ item.name }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-toolbar>


      <v-content>
        <v-container fluid>

          <login-dialog v-if="!loggedin"></login-dialog>

          <transition  name="fade" mode="out-in">
            <router-view v-if="loggedin"></router-view>
          </transition>

        </v-container>
      </v-content>

      <toast></toast>
      <dialog-window></dialog-window>
      <full-loading-spinner></full-loading-spinner>
    </v-app>
</template>

<script>
  // import axios from 'axios'
  import LoginDialog from './components/LoginDialog.vue'
  import Toast from './components/Toast.vue'
  import DialogWindow from './components/Dialog.vue'
  import FullLoadingSpinner from './components/FullLoadingSpinner.vue'

  export default {
    components: {
      LoginDialog,
      DialogWindow,
      Toast,
      FullLoadingSpinner
    },
    data () {
      return {
        loggedin: false,
        mini: false,
        drawer: null,
        breadcrumbs: []
      }
    },
    computed: {
      menuItems: {
        get () {
          return []
          // return this.$store.getters['MenuStore/menuItems'](0)
        }
      }
    },
    mounted () {
      this.$eventbus.$on('APP.AUTH_USER', this.login)
      this.$eventbus.$on('APP.LOGOUT_USER', this.logout)

      // this.$store.dispatch('MenuStore/GET_MENU_ITEMS').then(()=>{})

      if (this.$router.history.current.meta.breadcrumbs) {
        this.breadcrumbs = this.$router.history.current.meta.breadcrumbs
      }

      this.$router.afterEach((to, from) => {
        this.breadcrumbs = to.meta.breadcrumbs
        if (to.meta.breadcrumbs) {
          this.breadcrumbs = to.meta.breadcrumbs
        }
      })
    },
    methods: {
      login: function (auth) {
        setTimeout(() => {
          this.loggedin = true
        }, 2000)
      },
      logout: function (event) {
        this.loggedin = false
        // axios.post('/logout/').then((response) => {

        // }).catch(function (error) {
        //   console.log(error.response)
        // })
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
