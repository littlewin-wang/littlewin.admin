/**
 * @file Define vuex actions
 * @author littlewin(littlewin.wang@gmail.com)
 */

import API from '@/api/index'

export const userLogin = ({ commit }, token) => {
  commit('SET_USER_TOKEN', token)
}

export const setRouteMap = ({ commit }, routeMap) => {
  commit('SET_ROUTE_MAP', routeMap)
}

export const setUpToken = ({ commit }) => {
  API.GetQiniuAPI().then(res => {
    if (res.data.success) {
      commit('SET_UP_TOKEN', res.data.data.upToken)
    }
  })
}

export const getQcloudToken = ({ commit }) => {
  API.GetQcloudAPI().then(res => {
    if (res.data.success) {
      commit('SET_QCLOUD_TOKEN', res.data.data)
    }
  })
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

export const getTags = ({ commit }, query) => {
  API.GetTagListAPI(query).then(res => {
    if (res.data.success) {
      commit('SET_TAGS', res.data.data)
    }
  })
}

export const getCategories = ({ commit }, query) => {
  API.GetCateListAPI(query).then(res => {
    if (res.data.success) {
      commit('SET_CATEGORIES', res.data.data)
    }
  })
}

export const getArticles = ({ commit }, query) => {
  API.GetArticleListAPI(query).then(res => {
    if (res.data.success) {
      commit('SET_ARTICLES', res.data.data)
    }
  })
}

export const getComments = ({ commit }, query) => {
  API.GetCommentListAPI(query).then(res => {
    if (res.data.success) {
      commit('SET_COMMENTS', res.data.data.comments)
    }
  })
}

export const getEvents = ({ commit }) => {
  API.GetEventAPI().then(res => {
    if (res.data.success) {
      commit('SET_EVENTS', res.data.data.events)
    }
  })
}

export const getMsg = ({ commit }, query) => {
  API.GetMsgAPI(query).then(res => {
    if (res.data.success) {
      commit('SET_MSG', res.data.data)
    }
  })
}

export const setErrMsg = ({ commit }, msg) => {
  commit('SET_ERR_MSG', msg)
}
