import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login/Login'

import Main from '@/views/MainView.vue'

import Site from '@/views/Site/Site.vue'

import Article from '@/views/Article/Article.vue'
import Tag from '@/views/Article/Tag/Tag.vue'
import Category from '@/views/Article/Category/Category.vue'
import Post from '@/views/Article/Post/Post.vue'
import List from '@/views/Article/List/List.vue'
import Comment from '@/views/Comment/Comment.vue'

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
          icon: 'el-icon-setting',
          fullPath: '/site',
          requiresAuth: true
        }
      },
      {
        path: 'article',
        name: '文章设置',
        component: Article,
        meta: {
          icon: 'el-icon-edit',
          fullPath: '/article',
          requiresAuth: true
        },
        children: [
          {
            path: 'post/:id',
            name: '撰写文章',
            component: Post,
            meta: {
              fullPath: '/article/post/new',
              requiresAuth: true
            }
          },
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
          },
          {
            path: 'list',
            name: '全部文章',
            component: List,
            meta: {
              fullPath: '/article/list',
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'comment',
        name: '评论设置',
        component: Comment,
        meta: {
          icon: 'el-icon-star-on',
          fullPath: '/comment',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta: {
      icon: 'el-icon-setting',
      fullPath: '/Login',
      requiresAuth: true
    }
  }
]

export default new Router({
  routes: routerMap,
  mode: 'history',
  linkActiveClass: 'active'
})
