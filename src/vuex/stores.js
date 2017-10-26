/**
 * @file store.js
 * @author littlewin(littlewin.wang@gmail.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import plugins from './plugins'

Vue.use(Vuex)

export const STORAGE_TOKEN_KEY = 'JWT_KEY'

export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem(STORAGE_TOKEN_KEY) || '',
    global: {
      routerMap: [],
      upToken: ''
    },
    site: {},
    user: {},
    tags: [],
    categories: [],
    articles: [],
    comments: [],
    errMsg: ''
  },
  getters,
  mutations,
  actions,
  plugins
})
