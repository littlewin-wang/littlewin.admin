// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/stores'
import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/style/index.styl'
import '@/style/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

sync(store, router)

// route hooks for auth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = sessionStorage.getItem('JWT_KEY')

    if (!token) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
