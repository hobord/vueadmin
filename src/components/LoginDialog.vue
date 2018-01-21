<<template>
  <v-dialog persistent v-model='dlg' max-width="500px">
    <v-card>
      <v-card-media
        :src="require('assets/login_emo.jpg')"
        height="200px">
      </v-card-media>
      <v-card-title>
        <v-form style="width: 100%">
          <v-alert type="error" :value="error">
            Authentication error!
          </v-alert>
          <v-text-field
            name="authUser.email"
            v-model="authUser.email"
            label="Email"
            required
            single-line
          ></v-text-field>
          <v-text-field
            name="authUser.password"
            label="Password"
            type="password"
            required
            v-model="authUser.password"
            v-on:keyup.enter='login'
          ></v-text-field>
        </v-form>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color=""
          :disabled="loading"
          @click.stop="forget()"
          >Forget Password
        </v-btn>
        <v-btn color="primary"
          :loading="loading"
          :disabled="loading"
          @click.stop="login"
          >Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dlg: true,
        loading: false,
        error: false,
        authUser: {
          email: null,
          password: null
        }
      }
    },
    mounted () {

    },
    methods: {
      login: function () {
        this.error = false
        this.loading = true
        this.$eventbus.$emit('APP.AUTH.LOGIN', {
          email: this.authUser.email,
          password: this.authUser.password
        })
      },
      auth_error: function () {
        this.loading = false
        this.error = true
      }
    }
  }
</script>
