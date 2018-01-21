<<template>
  <div class="text-xs-center">
    <v-bottom-sheet inset v-model='visible'>
      <v-card tile v-if='messageCounts>0'>
        <v-list>
          <v-list-tile>
            <v-list-tile-action v-if='messages[current].icon'>
              <v-icon color='primary'>{{messages[current].icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{messages[current].title}}
              </v-list-tile-title>
              <v-list-tile-sub-title v-if='messages[current].subTitle'>
                {{messages[current].subTitle}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if='current>0'>
              <v-btn icon @click.native='current--'>
                <v-icon>skip_previous</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if='current<messages.length-1'>
              <v-btn icon @click.native='current++'>
                <v-icon>skip_next</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn flat icon color='red' @click.native='delete_message'>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action v-if='messages[current].text'>
              <v-btn icon @click.native="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-slide-y-transition>
          <v-card-text v-show="show" v-html="messages[current].text"></v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<<script>
export default {
  data () {
    return {
      visible: false,
      show: false,
      current: 0
    }
  },
  computed: {
    messages: {
      get () {
        return this.$store.state.AppMessages.messages
      }
    },
    messageCounts: {
      get () {
        return this.$store.getters['AppMessages/count']
      }
    }
  },
  mounted () {
    this.$eventbus.$on('APP.BOTTOM_MESSAGES.SHOW', this.show_messages)
  },
  methods: {
    delete_message: function () {
      if (this.current > 0) {
        this.current--
      }
      this.$store.commit('AppMessages/DELETE_MESSAGE', this.current)
      if (this.messageCounts === 0) {
        this.visible = false
      }
    },
    show_messages: function () {
      if (this.messageCounts > 0) {
        this.visible = true
      }
    }
  }
}
</script>
