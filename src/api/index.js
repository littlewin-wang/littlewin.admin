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
  GetTagList (keyword = '') {
    return axios.get(API_ROOT.concat(`tag?keyword=${keyword}`))
  },
  DeleteTagListAPI (params) {
    return axios.delete(API_ROOT.concat('tag'), {data: params})
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
  GetCateList (keyword = '') {
    return axios.get(API_ROOT.concat(`category?keyword=${keyword}`))
  },
  DeleteCateListAPI (params) {
    return axios.delete(API_ROOT.concat('category'), {data: params})
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
  // git repos
  GithubReposAPI () {
    return axios.get(API_ROOT.concat('github'))
  }
}
