const ExampleComponent = resolve => {
  require.ensure(['./components/ExampleComponent.vue'], () => {
    resolve(require('./components/ExampleComponent.vue'))
  })
}

export let routes = [
  {
    path: '/',
    component: ExampleComponent,
    name: 'home',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }]
    },
    children: []
  },
  {
    path: '/test',
    component: ExampleComponent,
    name: 'test',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Test', path: '/test' }]
    },
    children: []
  }
]

export let adminMenu = [
  {
    action: 'local_activity',
    title: 'Attractions',
    // active: true,
    items: [
      { title: 'List Item', action: 'local_activity', to: 'test' }
    ]
  },
  {
    action: 'restaurant',
    title: 'Dining',
    items: [
      { title: 'Breakfast & brunch' },
      { title: 'New American' },
      { title: 'Sushi' }
    ]
  },
  {
    action: 'school',
    title: 'Education',
    items: [
      { title: 'List Item' }
    ]
  },
  {
    action: 'directions_run',
    title: 'Family',
    items: [
      { title: 'List Item' }
    ]
  },
  {
    action: 'healing',
    title: 'Health',
    items: [
      { title: 'List Item' }
    ]
  },
  {
    action: 'content_cut',
    title: 'Office',
    items: [
      { title: 'List Item' }
    ]
  },
  {
    action: 'local_offer',
    title: 'Promotions',
    items: [
      { title: 'List Item' }
    ]
  }
]
