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
      app
      v-model="drawer">
      <v-list dense>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="user.avatar" v-if="user.avatar">
            <v-icon color="red darken-4" class="grey lighten-1" v-else>fa-user-secret</v-icon>
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

        <v-list-group
          v-for="item in adminMenu"
          :key="item.title"
          :prepend-icon="item.action"
          :value="(item.active)?true:false"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.to">
            <v-list-tile-action v-if="mini">
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="!mini">
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-divider></v-divider>

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
        adminMenu: []
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
      // Check logined user
      if (this.loggedin) {
        this.axios.defaults.headers.common['Authorization'] = this.$store.getters.auth_header
        this.load_user()
      }
      // Load adminMenu
      this.loadAdminMenu()
    },
    mounted () {
      // Listen to AUTH events
      this.$eventbus.$on('APP.AUTH.LOGIN', this.login)
      this.$eventbus.$on('APP.AUTH.LOGOUT', this.logout)
      this.$eventbus.$on('APP.AUTH.REFRESHTOKEN', this.refreshToken)

      // Set breadcrumb
      if (this.$router.history.current.meta.breadcrumbs) {
        this.breadcrumbs = this.$router.history.current.meta.breadcrumbs
      }

      // Router triggers
      this.$router.afterEach((to, from) => {
        // Breadcrumbs
        this.breadcrumbs = to.meta.breadcrumbs
        if (to.meta.breadcrumbs) {
          this.breadcrumbs = to.meta.breadcrumbs
        }

        // AdminMenu
        this.adminMenu.forEach(element => {
          let found = element.items.find(function (item) {
            if (item.to) {
              return item.to.name === to.name
            } else {
              return false
            }
          })
          if (found) {
            element.active = true
          }
        })
      })
    },
    methods: {
      show_bottom_messages: function () {
        this.$eventbus.$emit('APP.BOTTOM_MESSAGES.SHOW')
      },
      login: function (auth) {
        this.$services.userService.authUser(auth).then(response => {
          this.$store.commit('SET_AUTH_DATA', response)

          this.axios.defaults.headers.common['Authorization'] = this.$store.getters.auth_header
          this.load_user()
        }).catch(error => {
          console.log(error)
          this.$eventbus.$emit('APP.AUTH.USER_ERROR', error)
        })
      },
      refreshToken: function () {
        let refreshToken = this.$store.state.auth_data.refresh_token
        this.$services.userService.refreshToken(refreshToken).then(response => {
          this.$store.commit('SET_AUTH_DATA', response)

          this.axios.defaults.headers.common['Authorization'] = this.$store.getters.auth_header
        }).catch(error => {
          console.log(error)
          this.$eventbus.$emit('APP.AUTH.USER_ERROR', error)
        })
      },
      logout: function (event) {
        this.$store.commit('SET_AUTH_DATA', {})
        this.$store.commit('SET_USER', {})
        window.localStorage.clear()
        this.$router.push('/')
      },
      load_user: function () {
        this.$services.userService.loadUser().then(response => {
          this.$store.commit('SET_USER', response)
        }).catch(error => {
          console.log(error)
        })
      },
      loadAdminMenu: function () {
        // this.$store.dispatch('MenuStore/GET_MENU_ITEMS').then(()=>{})
        // this.$services.MenuService.getAdminMenu().then(response => {
        //  // SetLocally
        //   this.adminMenu = response.data
        //  // OR Save to Store
        //   this.$store.commit('MenuStore/SET_MENU_ITEMS', response.data);
        // }).catch(error => {
        //   this.$eventbus.$emit('APP.SHOW_TOAST', {
        //     text: 'Error happened! (.MenuService.getAdminMenu)',
        //     color: 'red'
        //   })
        //   this.loading =  0
        //   console.log(error)
        // })
        this.adminMenu = adminMenu
      }
    }
  }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .15s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
    .list__group__items--no-action .list__tile {
      padding-left: 16px;
    }
</style>
