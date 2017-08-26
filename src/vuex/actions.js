/**
 * @file Define vuex actions
 * @author littlewin(littlewin.wang@gmail.com)
 */

import API from '@/api/index'

export const setRouteMap = ({ commit }, routeMap) => {
  commit('SET_ROUTE_MAP', routeMap)
}

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

export const getTags = ({ commit }, str) => {
  API.GetTagList(str).then(res => {
    if (res.data.success) {
      commit('SET_TAGS', res.data.data.tags)
    }
  })
}

export const getCategories = ({ commit }, str) => {
  API.GetCateList(str).then(res => {
    if (res.data.success) {
      commit('SET_CATEGORIES', res.data.data.categories)
    }
  })
}
