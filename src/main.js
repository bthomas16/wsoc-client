import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import MainCSS from './assets/MainCSS.css'
import VueRouter from 'vue-router'
import { routes } from './routes'
import axios from 'axios'
import store from './State/store.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAnalytics from 'vue-analytics'
import VueCroppie from 'vue-croppie'

const isProductionEnvironment = process.env.NODE_ENV === 'production'
const nodeEnv = process.env.NODE_ENV
const isDomainOriginProduction = window.location.origin.includes('watchsoc')
console.log('origin be', isDomainOriginProduction, window.location.origin)



Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(MainCSS)
Vue.use(VueCroppie)

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API

const router = new VueRouter({
  mode: 'history',
  baseURL: process.env.BASE_URL, // SET BASE_URL HERE
  routes
})

if (isDomainOriginProduction) {
  Vue.use(VueAnalytics, {
    id: 'UA-131185774-2',
    router,
    debug: {
      enabled: !isProductionEnvironment,
      sendHitTask: isProductionEnvironment
    }
  })
} else if (!isDomainOriginProduction && nodeEnv != 'development') {
  Vue.use(VueAnalytics, {
    id: 'UA-131185774-1',
    router,
    debug: {
      enabled: true,
      sendHitTask: true
    }
  })
}

if (('serviceWorker' in navigator) && (process.env.NODE_ENV !== 'development')) {
  navigator.serviceWorker.register('/service-worker.js')
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
