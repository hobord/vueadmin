<template>
  <v-snackbar
      :top="top"
      :bottom="bottom"
      :multi-line="multiLine"
      :vertical="vertical"
      :color="color"
      :timeout="timeout"
      v-model="visible"
  >
    {{ text }}
    <v-btn flat @click.native="visible = false" dark>Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        top: false,
        bottom: true,
        color: 'primary',
        visible: false,
        vertical: false,
        multiLine: false,
        timeout: 6000,
        text: ''
      }
    },
    mounted () {
      var that = this
      this.$eventbus.$on('APP.TOAST.SHOW', function (payload) {
        that.show(payload)
      })
    },
    methods: {
      show (payload) {
        this.top = false
        this.bottom = true
        if (payload.top) {
          this.top = true
          this.bottom = false
        }
        this.text = payload.text
        this.color = (payload.color) ? payload.color : 'primary'
        this.timeout = (payload.timeout) ? payload.timeout : 6000
        this.vertical = (payload.vertical) ? payload.vertical : false
        this.multiLine = (payload.multiLine) ? payload.multiLine : false
        this.visible = true
        console.log('TOAST (' + payload.color + '): ' + payload.text)
      }
    }
  }
</script>
