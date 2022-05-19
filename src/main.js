import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './vantui'
import './assets/css/normalize.css'
import '../node_modules/nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
