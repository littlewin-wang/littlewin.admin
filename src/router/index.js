import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['@/views/Login/Login.vue'], resolve)
const Main = resolve => require(['@/views/MainView.vue'], resolve)
const Dashboard = resolve => require(['@/views/Dashboard/Dashboard.vue'], resolve)
const Message = resolve => require(['@/views/Message/Message.vue'], resolve)
const Site = resolve => require(['@/views/Site/Site.vue'], resolve)
const Article = resolve => require(['@/views/Article/Article.vue'], resolve)
const Tag = resolve => require(['@/views/Article/Tag/Tag.vue'], resolve)
const Category = resolve => require(['@/views/Article/Category/Category.vue'], resolve)
const Post = resolve => require(['@/views/Article/Post/Post.vue'], resolve)
const List = resolve => require(['@/views/Article/List/List.vue'], resolve)
const Comment = resolve => require(['@/views/Comment/Comment.vue'], resolve)

Vue.use(Router)

export const routerMap = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta: {
      fullPath: '/Login'
    }
  },
  {
    path: '/',
    name: '主页面',
    component: Main,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '概览',
        component: Dashboard,
        meta: {
          icon: 'el-icon-menu',
          fullPath: '/dashboard',
          requiresAuth: true
        }
      },
      {
        path: 'message',
        name: '公告管理',
        component: Message,
        meta: {
          icon: 'el-icon-information',
          fullPath: '/message',
          requiresAuth: true
        }
      },
      {
        path: 'site',
        name: '站点设置',
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
  }
]

export default new Router({
  routes: routerMap,
  mode: 'history',
  linkActiveClass: 'active'
})
