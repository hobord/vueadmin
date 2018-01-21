# VueAdmin

>Vue.js Admin Preset

vuex, axios, vuetify, apollo, sass, moment

## Build Setup

``` bash
# install dependencies
npm install -D

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## App Events on EventBus

You can access the event bus this way:
```
  this.$eventbus.$emit('APP.BOTTOM_MESSAGES.SHOW')
```
or You can import
```
  import { EventBus } from 'src/eventBus'
```
Listening in app component:
  - APP.AUTH.LOGIN
  - APP.AUTH.USER_ERROR
  - APP.AUTH.LOGOUT

Listening in FullLoadingSpinner:
  - APP.LOADER.SHOW
  - APP.LOADER.SET_VALUE, {value: 5}
  - APP.LOADER.HIDE
  - APP.LOADER.HIDE_ALL

Listening in Dialog:
  - APP.DIALOG.SHOW, {}

Listening in Toast:
  - APP.TOAST.SHOW, {}

Listening in BottomInfoBar:
  - APP.BOTTOM_MESSAGES.SHOW

