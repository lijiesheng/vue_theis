import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'

import downLoadUrl from './downLoadUrl/index'
import common from './assets/js/common'
Vue.use(common);
Vue.use(downLoadUrl);
// Vue.config.productionTip = false
Vue.use(ElementUI)

// 配置请求的根路经
// axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.baseURL = 'http://101.42.97.221:8080/'

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
