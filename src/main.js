import Vue from 'vue'
import App from './App.vue'

// #region Sweet Alert
// https://www.npmjs.com/package/vue-sweetalert2, https://sweetalert2.github.io/
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)
// #endregion

// #region Vuex
import store from './vuex'
// #endregion

// #region Location Vue
// import VueLocation from 'vue-location'
// Vue.use(VueLocation)
// #endregion

// #region Router
import { router } from './router'
// #endregion

// #region Directives
import directives from './directives'
// #endregion

// #region Axios
import { http } from './http'
Vue.prototype.$http = http
// #endregion

// #region Filters
import filters from './filters'
// #endregion

// #region Componentes Generales
// import { default as components } from './components'
import VueBarcode from '@xkeshi/vue-barcode'
Vue.component('barcode', VueBarcode)
// #endregion

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
