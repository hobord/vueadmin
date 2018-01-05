const ExampleComponent = resolve => {
  require.ensure(['./components/ExampleComponent.vue'], () => {
    resolve(require('./components/ExampleComponent.vue'))
  })
}

export let routes = [{
  path: '/',
  component: ExampleComponent,
  name: 'home',
  meta: {
    breadcrumbs: [{ name: 'Home', path: '/' }]
  },
  children: [

  ]
},
{
  path: '/test',
  component: ExampleComponent,
  name: 'test',
  meta: {
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Test', path: '/test' }]
  },
  children: [

  ]
}
]
