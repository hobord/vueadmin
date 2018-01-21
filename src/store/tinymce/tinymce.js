const Tinymce = {
  namespaced: true,
  subStore: 'Tinymce',
  prefix: 'Tinymce/',
  state: {
    default: {
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern importcss'
      ],
      toolbar1: 'styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media link image | fullscreen print preview',
      toolbar2: '',
      other_options: {
        menubar: 'edit insert view format table tools help',
        link_context_toolbar: true,
        link_class_list: [
          {title: 'None', value: ''},
          {title: 'Dog', value: 'dog'},
          {title: 'Cat', value: 'cat'}
        ],
        height: 600,
        importcss_append: true,
        image_title: true,
        image_advtab: true,
        paste_data_images: true,
        image_class_list: [
          {title: 'None', value: ''},
          {title: 'Dog', value: 'dog'},
          {title: 'Cat', value: 'cat'}
        ],
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
