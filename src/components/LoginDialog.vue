<<template>
  <v-dialog persistent v-model='dlg' max-width="500px">
    <v-card>
      <v-card-media src="/static/login_emo.jpg" height="200px">
      </v-card-media>
      <v-card-title>
        <v-form style="width: 100%">
          <v-text-field
            name="authUser.username"
            v-model="authUser.username"
            label="Username"
            required
            single-line
          ></v-text-field>
          <v-text-field
            name="authUser.password"
            label="Password"
            type="password"
            required
            v-model="authUser.password"
          ></v-text-field>
        </v-form>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary"
          :loading="loading"
          :disabled="loading"
          @click.stop="login()"
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
        authUser: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      login: function () {
        this.loading = true
        this.$eventbus.$emit('AUTH_USER', {
          username: this.authUser.username,
          content: this.authUser.password
        })
      }
    }
  }
</script>
