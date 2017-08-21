import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/MainView.vue'
import Site from '@/views/Site/Site.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'site',
          name: '全局设置',
          component: Site,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})
