<template>
  <v-dialog v-model="isVisible" persistent>
    div*3>span
    <v-card>
      <v-card-title class="headline" :class="classes">{{title}}</v-card-title>
      <v-card-text>{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="darken-1" :class="btnCancelClasses" flat="flat" @click.native="btnCancel" v-if="btnCancelText!=''">{{btnCancelText}}</v-btn>
        <v-btn class="darken-1" :class="btnOkClasses" flat="flat" @click.native="btnOkCall" v-if="btnOkText!=''">{{btnOkText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        isVisible: false,
        classes: 'red',
        title: 'Warning!',
        content: 'Are you sure you want to delete the content?',
        btnCancelText: 'Cancel',
        btnCancelClasses: 'green--text',
        btnOkText: 'Ok',
        btnOkClasses: 'red--text',
        btnOkCallback: this.deafultCallBack,
        payload: null
      }
    },
    mounted () {
      var that = this
      this.$eventbus.$on('SHOW_DIALOG', function (payload) {
        that.show(payload)
      })
    },
    methods: {
      deafultCallBack () {
        console.log('btnOk Clicked')
      },
      show (payload) {
        if (payload.callback) this.btnOkCallback = payload.callback
        if (payload.classes) this.classes = payload.classes
        if (payload.title) this.title = payload.title
        if (payload.content) this.content = payload.content
        if (payload.btnCancelText) this.btnCancelText = payload.btnCancelText
        if (payload.btnCancelClasses) this.btnCancelClasses = payload.btnCancelClasses
        if (payload.btnOkText) this.btnOkText = payload.btnOkText
        if (payload.btnOkClasses) this.btnOkClasses = payload.btnOkClasses
        if (payload.payload) this.payload = payload.payload

        this.isVisible = true
      },
      btnCancel () {
        this.isVisible = false
        this.btnOkCallback = this.deafultCallBack
      },
      btnOkCall () {
        this.isVisible = false
        if (this.payload) {
          this.btnOkCallback(this.payload)
        } else {
          this.btnOkCallback()
        }
      }
    }
  }
</script>
