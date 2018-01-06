<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="white-overlay" v-if="show">
      <div class="loader-wrapper">
        <v-progress-circular indeterminate v-bind:size="150" color="primary"></v-progress-circular>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    mounted () {
      var that = this
      this.$eventbus.$on('SHOW_LOADER', function (payload) {
        that.show = true
      })
      this.$eventbus.$on('HIDE_LOADER', function (payload) {
        that.show = false
      })
    }
  }
</script>

<style>
.white-overlay {
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 9999;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    position: fixed;
    margin: 0;

    padding: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
