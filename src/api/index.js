/**
 * @file API common interface
 * @author littlewin(littlewin.wang@gmail.com)
 */

import axios from 'axios'

const API_ROOT = 'http://119.29.68.183/api/'
axios.defaults.withCredentials = true

export default {
  // auth api
  UserInfoAPI () {
    return axios.get(API_ROOT.concat('user'))
  },
  ModifyUserInfoAPI (params) {
    return axios.put(API_ROOT.concat('user'), params)
  },
  // tag api
  CreateTagAPI (params) {
    return axios.post(API_ROOT.concat('tag'), params)
  },
  GetTagList () {
    return axios.get(API_ROOT.concat('tag'))
  },
  ModifyTagAPI (id, params) {
    return axios.put(API_ROOT.concat('tag/').concat(id), params)
  },
  RemoveTagAPI (id) {
    return axios.delete(API_ROOT.concat('tag/').concat(id))
  },
  // site info
  SiteInfoAPI () {
    return axios.get(API_ROOT.concat('site'))
  },
  ModifySiteInfoAPI (params) {
    return axios.put(API_ROOT.concat('site'), params)
  },
  // git repos
  GithubReposAPI () {
    return axios.get(API_ROOT.concat('github'))
  }
}
