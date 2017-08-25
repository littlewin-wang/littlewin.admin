/**
 * @file store.js
 * @author littlewin(littlewin.wang@gmail.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    site: {},
    user: {},
    tags: [],
    categories: []
  },
  getters,
  mutations,
  actions
})
