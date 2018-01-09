import { UserService } from './UserService'

const ServicesPlugin = {
  install (Vue, options) {
    Vue.prototype.$services = {}
    Vue.prototype.$services.userService = UserService
  }
}

export default ServicesPlugin
