// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

import API from './api/index'
import '@/style/index.styl'

API.SiteInfoAPI().then(res => {
  console.log(res)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
