import Vue from 'vue'
import axios from 'axios'
import startInterval from 'startinterval2'

import App from './App'
import router from './router'
import store from './store'
import spoof from './services/spoof'

const GET_INTERFACES_INTERVAL_TIMER = 5000

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// Note: We need to continually check if there are new interfaces, a usual
//       scenario is a user connecting a new device. This simulates a
//       real time device listener.
startInterval(function () {
  const query = []
  const interfaces = spoof.findInterfaces(query)
  store.dispatch('setInterfaces', interfaces)
}, GET_INTERFACES_INTERVAL_TIMER)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
