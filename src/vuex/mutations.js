/**
 * @file mutations.js
 * @author littlewin(littlewin.wang@gmail.com)
 */

export const SET_USER_TOKEN = (state, token) => {
  state.token = token
}

export const SET_ROUTE_MAP = (state, routeMap) => {
  state.global.routerMap = routeMap
}

export const SET_UP_TOKEN = (state, upToken) => {
  state.global.upToken = upToken
}

export const SET_SITE = (state, site) => {
  state.site = site
}

export const SET_USER = (state, user) => {
  state.user = user
}

export const SET_TAGS = (state, tags) => {
  state.tags = tags
}

export const SET_CATEGORIES = (state, categories) => {
  state.categories = categories
}

export const SET_ARTICLES = (state, articles) => {
  state.articles = articles
}

export const SET_COMMENTS = (state, comments) => {
  state.comments = comments
}

export const SET_ERR_MSG = (state, errMsg) => {
  state.errMsg = errMsg
}
