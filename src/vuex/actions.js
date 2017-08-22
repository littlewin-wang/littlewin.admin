/**
 * @file Define vuex actions
 * @author littlewin(littlewin.wang@gmail.com)
 */

import API from '@/api/index'

export const getSite = ({ commit }) => {
  API.SiteInfoAPI().then(res => {
    if (res.data.success) {
      commit('SET_SITE', res.data.data.site)
    }
  })
}

export const getUser = ({ commit }) => {
  API.UserInfoAPI().then(res => {
    if (res.data.success) {
      commit('SET_USER', res.data.data.user)
    }
  })
}
