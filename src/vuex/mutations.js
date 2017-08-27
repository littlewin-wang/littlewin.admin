/**
 * @file mutations.js
 * @author littlewin(littlewin.wang@gmail.com)
 */
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
