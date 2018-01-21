const Tinymce = {
  namespaced: true,
  subStore: 'Tinymce',
  prefix: 'Tinymce/',
  state: {
    default: {
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern'
      ],
      toolbar1: 'styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media link image | print preview',
      toolbar2: '',
      other_options: {
        menubar: 'edit insert view format table tools help',
        height: 600,
        paste_data_images: true,
        image_advtab: true,
        templates: [{
          title: 'Test template 1',
          content: 'Test 1'
        }, {
          title: 'Test template 2',
          content: 'Test 2'
        }]
      }
    }
  }
}

export default Tinymce
