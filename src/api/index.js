/**
 * @file API common interface
 * @author littlewin(littlewin.wang@gmail.com)
 */

import axios from 'axios'

const API_ROOT = 'http://119.29.68.183/api/'
axios.defaults.withCredentials = true

export default {
  SiteInfoAPI () {
    return axios.get(API_ROOT.concat('site'))
  },
  GithubReposAPI () {
    return axios.get(API_ROOT.concat('github'))
  }
}

