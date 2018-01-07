<template>
  <v-dialog v-model="isVisible" persistent :max-width='maxWidth'>
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
        maxWidth: '500px',
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
      this.$eventbus.$on('APP.SHOW_DIALOG', function (payload) {
        that.show(payload)
      })
    },
    methods: {
      deafultCallBack () {
        console.log('btnOk Clicked')
      },
      show (payload) {
        this.maxWidth = (payload.maxWidth) ? payload.maxWidth : '500px'
        this.callback = (payload.callback) ? payload.callback : this.deafultCallBack
        this.classes = (payload.classes) ? payload.classes : 'red'
        this.title = (payload.title) ? payload.title : 'Title'
        this.content = (payload.content) ? payload.content : 'Title'
        this.btnCancelText = (payload.btnCancelText) ? payload.btnCancelText : 'Cancel'
        this.btnCancelClasses = (payload.btnCancelClasses) ? payload.btnCancelClasses : 'green--text'
        this.btnOkText = (payload.btnOkText) ? payload.btnOkText : 'Ok'
        this.btnOkClasses = (payload.btnOkClasses) ? payload.btnOkClasses : 'red--text'
        this.payload = (payload.payload) ? payload.payload : null
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
        this.btnOkCallback = this.deafultCallBack
      }
    }
  }
</script>
