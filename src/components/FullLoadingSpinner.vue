<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="white-overlay" v-if="visible">
      <div class="loader-wrapper">
        <v-progress-circular
          :indeterminate='value===null'
          size="150"
          :width='(value)?15:3'
          color="primary"
          :rotate='-90'
          :value='value'>
          <span v-if="value">{{ value }}%</span>
        </v-progress-circular>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        queue: 0,
        value: null
      }
    },
    computed: {
      visible: {
        get () {
          return (this.queue > 0)
        }
      }
    },
    mounted () {
      this.$eventbus.$on('APP.LOADER.SHOW', this.show)
      this.$eventbus.$on('APP.LOADER.SET_VALUE', this.setValue)
      this.$eventbus.$on('APP.LOADER.HIDE', this.hide)
      this.$eventbus.$on('APP.LOADER.HIDE_ALL', this.hideAll)
    },
    methods: {
      show: function () {
        this.queue++
      },
      hide: function () {
        this.queue = (this.queue > 0) ? this.queue - 1 : 0
      },
      hideAll: function () {
        this.queue = 0
      },
      setValue: function (payload) {
        if (payload) {
          this.value = payload.value
        } else {
          this.value = null
        }
      }
    }
  }
</script>

<style scoped>
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
