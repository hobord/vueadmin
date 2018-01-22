const ExampleApollo = resolve => {
  require.ensure(['./components/Examples/ApolloGraphQL.vue'], () => {
    resolve(require('./components/Examples/ApolloGraphQL.vue'))
  })
}

const ExampleGrid = resolve => {
  require.ensure(['./components/Examples/Grid.vue'], () => {
    resolve(require('./components/Examples/Grid.vue'))
  })
}

const ExampleMessages = resolve => {
  require.ensure(['./components/Examples/Messaging.vue'], () => {
    resolve(require('./components/Examples/Messaging.vue'))
  })
}

const ExampleEditor = resolve => {
  require.ensure(['./components/Examples/TinymceEditor.vue'], () => {
    resolve(require('./components/Examples/TinymceEditor.vue'))
  })
}

export let routes = [
  {
    path: '/',
    component: ExampleMessages,
    name: 'home',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }]
    },
    children: []
  },
  {
    path: '/apollo',
    component: ExampleApollo,
    name: 'apollo',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Apollo GraphQL', path: '/apollo' }]
    },
    children: []
  },
  {
    path: '/grid',
    component: ExampleGrid,
    name: 'grid',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Grid', path: '/grid' }]
    },
    children: []
  },
  {
    path: '/messages',
    component: ExampleMessages,
    name: 'messages',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Messages', path: '/messages' }]
    },
    children: []
  },
  {
    path: '/editor',
    component: ExampleEditor,
    name: 'editor',
    meta: {
      breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Editor', path: '/editor' }]
    },
    children: []
  }
]

export let adminMenu = [
  {
    action: 'local_activity',
    title: 'Examples',
    // active: true,
    items: [
      { title: 'Apollo GrapQL', action: 'local_activity', to: {name: 'apollo'} },
      { title: 'Grid', action: 'local_activity', to: {name: 'grid'} },
      { title: 'Messages', action: 'local_activity', to: {name: 'messages'} },
      { title: 'Editor', action: 'local_activity', to: {name: 'editor'} }
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
