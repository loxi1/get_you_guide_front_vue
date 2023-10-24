import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_APIURL
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

import './assets/css/styles.css' //style
Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  data: {
  },
  created () {
  },
  render: h => h(App)
}).$mount('#app')
