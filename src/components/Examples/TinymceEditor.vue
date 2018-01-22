<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Example Tinymce editor</div>
          <div class="panel-body">
            <tinymce
              id="tinymceeditor"
              v-model="content"
              :toolbar1="tinymceOptions.toolbar1"
              :toolbar2="tinymceOptions.toolbar2"
              :plugins="tinymceOptions.plugins"
              :other_options="tinymceOptions.other_options"
            ></tinymce>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tinymce from 'src/components/TinimceVue.vue'

  export default {
    components: {
      tinymce
    },
    data: () => ({
      content: ''
    }),
    computed: {
      tinymceOptions: function () {
        let options = JSON.parse(JSON.stringify(this.$store.state.Tinymce.default))
        return options
      }
    }
  }
</script>

