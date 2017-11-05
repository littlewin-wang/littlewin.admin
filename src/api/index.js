/**
 * @file API common interface
 * @author littlewin(littlewin.wang@gmail.com)
 */

import axios from 'axios'
import router from '../router'
import store from '../vuex/stores'

const API_ROOT = 'https://api.littlewin.wang/'
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (sessionStorage.getItem('JWT_KEY')) {
      config.headers.Authorization = sessionStorage.getItem('JWT_KEY')
    }

    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let errorMsg = error.toString()
    if (errorMsg === 'Error: Network Error') {
      store.commit('SET_ERR_MSG', errorMsg)
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 500:
          store.commit('SET_ERR_MSG', errorMsg)
          break
      }
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  })

export default {
  // auth api
  UserLoginAPI (params) {
    return axios.post(API_ROOT.concat('user'), params)
  },
  UserInfoAPI () {
    return axios.get(API_ROOT.concat('user'))
  },
  ModifyUserInfoAPI (params) {
    return axios.put(API_ROOT.concat('user'), params)
  },
  // article api
  CreateArticleAPI (params) {
    return axios.post(API_ROOT.concat('article'), params)
  },
  GetArticleAPI (id) {
    return axios.get(API_ROOT.concat('article/').concat(id))
  },
  ModifyArticleAPI (id, params) {
    return axios.put(API_ROOT.concat('article/').concat(id), params)
  },
  GetArticleListAPI ({ page = 1, limit = 10, state = '', pub = '', keyword = '', category = '', tag = '', date = '', hot = '' }) {
    return axios.get(API_ROOT.concat(`article?page=${page}&state=${state}&pub=${pub}&keyword=${keyword}&category=${category}&tag=${tag}&date=${date}&hot=${hot}&per_page=${limit}`))
  },
  ModifyArticleStateAPI (params) {
    return axios.patch(API_ROOT.concat('article'), params)
  },
  // comment api
  GetCommentListAPI ({ state = '', keyword = '', postID = '' }) {
    return axios.get(API_ROOT.concat(`comment?state=${state}&keyword=${keyword}&postID=${postID}`))
  },
  ModifyCommentStateAPI (params) {
    return axios.patch(API_ROOT.concat('comment'), params)
  },
  // tag api
  CreateTagAPI (params) {
    return axios.post(API_ROOT.concat('tag'), params)
  },
  GetTagListAPI ({ keyword = '', page = 1, limit = 10 }) {
    return axios.get(API_ROOT.concat(`tag?keyword=${keyword}&page=${page}&per_page=${limit}`))
  },
  DeleteTagListAPI (params) {
    return axios.delete(API_ROOT.concat('tag'), { data: params })
  },
  ModifyTagAPI (id, params) {
    return axios.put(API_ROOT.concat('tag/').concat(id), params)
  },
  DeleteTagAPI (id) {
    return axios.delete(API_ROOT.concat('tag/').concat(id))
  },
  // category api
  CreateCateAPI (params) {
    return axios.post(API_ROOT.concat('category'), params)
  },
  GetCateListAPI ({ keyword = '', page = 1, limit = 10 }) {
    return axios.get(API_ROOT.concat(`category?keyword=${keyword}&page=${page}&per_page=${limit}`))
  },
  DeleteCateListAPI (params) {
    return axios.delete(API_ROOT.concat('category'), { data: params })
  },
  ModifyCateAPI (id, params) {
    return axios.put(API_ROOT.concat('category/').concat(id), params)
  },
  DeleteCateAPI (id) {
    return axios.delete(API_ROOT.concat('category/').concat(id))
  },
  // site info
  SiteInfoAPI () {
    return axios.get(API_ROOT.concat('site'))
  },
  ModifySiteInfoAPI (params) {
    return axios.put(API_ROOT.concat('site'), params)
  },
  // qiniu token
  GetQiniuAPI () {
    return axios.get(API_ROOT.concat('qiniu'))
  },
  // git repos
  GithubReposAPI () {
    return axios.get(API_ROOT.concat('github'))
  },
  // server stat
  ServerStatAPI () {
    return axios.get(API_ROOT.concat('server'))
  },
  // event list
  GetEventAPI () {
    return axios.get(API_ROOT.concat('event'))
  }
}
