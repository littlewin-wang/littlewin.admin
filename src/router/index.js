import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/MainView.vue'

import Site from '@/views/Site/Site.vue'

import Article from '@/views/Article/Article.vue'
import Tag from '@/views/Article/Tag/Tag.vue'

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
        },
        {
          path: 'article',
          name: '文章设置',
          component: Article,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'tag',
              name: '标签管理',
              component: Tag,
              meta: {
                requiresAuth: true
              }
            }
          ]
        }
      ]
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})
