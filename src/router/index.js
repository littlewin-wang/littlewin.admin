import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/MainView.vue'

import Site from '@/views/Site/Site.vue'

import Article from '@/views/Article/Article.vue'
import Tag from '@/views/Article/Tag/Tag.vue'
import Category from '@/views/Article/Category/Category.vue'

Vue.use(Router)

export const routerMap = [
  {
    path: '/',
    name: '主页面',
    component: Main,
    children: [
      {
        path: 'site',
        name: '全局设置',
        component: Site,
        meta: {
          fullPath: '/site',
          requiresAuth: true
        }
      },
      {
        path: 'article',
        name: '文章设置',
        component: Article,
        meta: {
          fullPath: '/article',
          requiresAuth: true
        },
        children: [
          {
            path: 'tag',
            name: '标签管理',
            component: Tag,
            meta: {
              fullPath: '/article/tag',
              requiresAuth: true
            }
          },
          {
            path: 'category',
            name: '分类管理',
            component: Category,
            meta: {
              fullPath: '/article/category',
              requiresAuth: true
            }
          }
        ]
      }
    ]
  }
]

export default new Router({
  routes: routerMap,
  mode: 'history',
  linkActiveClass: 'active'
})
