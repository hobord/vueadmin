<template>
  <v-app id="app">
    <v-navigation-drawer
      app
      right
      v-model="right"
      fixed
      hide-overlay
      temporary
      floating
      v-if="loggedin"
    ></v-navigation-drawer>
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
            <v-icon color="red darken-4" class="grey lighten-1">fa-user-secret</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action @click.stop="mini = !mini">
            <v-btn icon>
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>
      </v-list>

      <v-list>
        <v-list-tile v-for="item in adminMenu"
          :key="item.title"
          :prepend-icon="item.icon"
          :to="item.to">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{item.title}}
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
      <v-toolbar-title  class="white--text">בלש:</v-toolbar-title>

      <v-breadcrumbs divider="/" >
        <v-breadcrumbs-item
            v-for="item in breadcrumbs"
            :key="item.name"
            :to="item.path"
        >
          {{ item.name }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>

      <v-spacer></v-spacer>
      <v-btn icon @click.native="show_bottom_messages()">
        <v-badge overlap transition="scale-transition" color='red'>
          <span slot="badge" v-if="messageCounts>0">{{messageCounts}}</span>
          <v-icon>inbox</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon @click.native="right = !right">
        <v-badge left color="red">
          <span slot="badge" v-if="badge>0">{{badge}}</span>
          <v-icon>more_vert</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <login-dialog v-if="!loggedin"></login-dialog>

        <transition  name="fade" mode="out-in">
          <router-view v-if="loggedin"></router-view>
        </transition>

      </v-container>
    </v-content>

    <bottom-info-bar></bottom-info-bar>
    <toast></toast>
    <dialog-window></dialog-window>
    <full-loading-spinner></full-loading-spinner>
  </v-app>
</template>

<script>
  import { adminMenu } from './routes.js'
  import LoginDialog from './components/LoginDialog.vue'
  import Toast from './components/Toast.vue'
  import DialogWindow from './components/Dialog.vue'
  import FullLoadingSpinner from './components/FullLoadingSpinner.vue'
  import BottomInfoBar from './components/BottomInfoBar.vue'

  export default {
    components: {
      LoginDialog,
      DialogWindow,
      Toast,
      FullLoadingSpinner,
      BottomInfoBar
    },
    data () {
      return {
        mini: false,
        drawer: null,
        right: false,
        badge: 0,
        breadcrumbs: [],
        adminMenu: adminMenu
      }
    },
    computed: {
      menuItems: {
        get () {
          return []
          // return this.$store.getters['MenuStore/menuItems'](0)
        }
      },
      messageCounts: {
        get () {
          return this.$store.getters['AppMessages/count']
        }
      },
      loggedin: {
        get () {
          return (this.$store.state.auth_data.access_token)
        },
        set (newVal) {
          return true
        }
      },
      user: {
        get () {
          return this.$store.state.user
        }
      }
    },
    created () {
      if (this.$cookies.isKey('access_token')) {
        let data = {
          access_token: this.$cookies.get('access_token'),
          expires_in: this.$cookies.get('expires_in'),
          refresh_token: this.$cookies.get('refresh_token'),
          token_type: this.$cookies.get('token_type')
        }
        this.$store.commit('SET_AUTH_DATA', data)
        this.axios.defaults.headers.common['Authorization'] = this.$store.getters.auth_header
        this.load_user()
      }
    },
    mounted () {
      // console.log(this.adminMenu)
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
      show_bottom_messages: function () {
        this.$eventbus.$emit('APP.SHOW_BOTTOM_MESSAGES')
      },
      login: function (auth) {
        this.$services.userService.authUser(auth).then(response => {
          this.$store.commit('SET_AUTH_DATA', response)
          this.$store.commit('SET_AUTH_DATA', response)
          this.$cookies.set('access_token', response.access_token)
          this.$cookies.set('expires_in', response.expires_in)
          this.$cookies.set('refresh_token', response.refresh_token)
          this.$cookies.set('token_type', response.token_type)

          this.axios.defaults.headers.common['Authorization'] = this.$store.getters.auth_header
          this.load_user()
        }).catch(error => {
          console.log(error)
          this.$eventbus.$emit('APP.AUTH_USER_ERROR', error)
        })
      },
      logout: function (event) {
        // this.loggedin = false
        this.$cookies.remove('access_token')
        this.$cookies.remove('expires_in')
        this.$cookies.remove('refresh_token')
        this.$cookies.remove('token_type')

        this.$store.commit('SET_AUTH_DATA', {})
        this.$store.commit('SET_USER', {})

        document.location.reload()
      },
      load_user: function () {
        this.$services.userService.loadUser().then(response => {
          this.$store.commit('SET_USER', response)
        }).catch(error => {
          console.log(error)
        })
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
