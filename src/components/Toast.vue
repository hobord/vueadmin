<template>
  <v-snackbar
      bottom
      :multi-line=true
      :vertical=true
      :success="success"
      :info="info"
      :warning="warning"
      :error="error"
      :primary="primary"
      :secondary="secondary"
      :timeout="timeout"
      v-model="visible"
  >
    {{ text }}
    <v-btn flat @click.native="visible = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import {EventBus} from '../eventBus'
  export default {
    data () {
      return {
        success: false,
        info: false,
        warning: false,
        error: false,
        primary: false,
        secondary: false,
        visible: false,
        timeout: 6000,
        text: ''
      }
    },
    mounted () {
      var that = this
      EventBus.$on('SHOW_TOAST', function (payload) {
        that.show(payload)
      })
    },
    methods: {
      show (payload) {
        this.success = false
        this.info = false
        this.warning = false
        this.error = false
        this.primary = false
        this.secondary = false
        this.text = ''
        switch (payload.type) {
          case 'success': this.success = true
            break
          case 'info': this.info = true
            break
          case 'warning': this.warning = true
            break
          case 'error': this.error = true
            break
          case 'primary': this.primary = true
            break
          case 'secondary': this.secondary = true
            break
          default: this.primary = true
            break
        }
        this.text = payload.text
        this.visible = true
        console.log('TOAST (' + payload.type + '):' + payload.text)
      }
    }
  }
</script>
