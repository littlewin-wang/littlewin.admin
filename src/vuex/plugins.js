/**
 * @file Save token to sessionStorage
 * @author littlewin(littlewin.wang@gmail.com)
 */

import { STORAGE_TOKEN_KEY } from './stores'
// import Cookies from 'js-cookie'

const sessionStoragePlugin = store => {
  store.subscribe((mutation, { token }) => {
    window.sessionStorage.setItem(STORAGE_TOKEN_KEY, token)
  })
}

export default [sessionStoragePlugin]
