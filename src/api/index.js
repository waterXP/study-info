import axios from 'axios'
import { message } from 'antd'
import { stringify } from 'qs'
import CryptoJS from 'crypto-js'
import { getBaseUrl } from './android'

const getParamsStr = params => {
  const sortedKeys = Object.keys(params).sort()
  let str = ''
  sortedKeys.forEach(key => {
    str += params[key]
  })
  return str
}

const getSign = params => {
  const str = getParamsStr({
    ...params,
    appSecret:
      'PlSqxPrsa3cE1ms-TW_xwuBT3-Fy2Q1wcjcdLgkqOyiGQ1WejB0AMtKRdUDy3CDr'
  })
  return CryptoJS.MD5(str).toString()
}

const buildData = ori => {
  const params = {
    ...(ori || {}),
    appKey: 'dingjasudvtsjkbuygl3',
    timeStamp: Date.now()
  }
  params.sign = getSign(params)
  return params
}

const loginApi = '/user/mockLogin'
const loginMockApi = '/user/login'

// 默认请求格式
const DefaultContentType = 'application/x-www-form-urlencoded;charset=UTF-8'
const baseURL = `${getBaseUrl()}/api`
// window.alert(baseURL)
// const baseURL = 'http://221.12.170.114:30009/api' // 测试环境

const instance = axios.create({
  baseURL,
  timeout: 20000, // 默认20s，对特定需要配置的接口只需要配置自定义字段
  withCredentials: false,
  responseType: 'json',
  headers: { 'Content-Type': DefaultContentType },
  validateStatus(status) {
    return status >= 200 && status < 300 // default
  }
})

export const updateInstance = url => {
  instance.defaults.baseURL = `${url}/api`
}

// 添加一个请求拦截器
instance.interceptors.request.use(
  config => {
    // config.baseURL = `${getBaseUrl()}/api`
    // 配置 rap2 模拟数据, 配置请求参数
    if (config.method === 'post') {
      if (config.data) {
        if (config.data._baseUrl) {
          config.baseURL = config.data._baseUrl
          delete config.data._baseUrl
        }
      } else {
        config.data = {}
      }
    } else if (config.params) {
      if (config.params._baseUrl || config.params._baseUrl !== undefined) {
        config.baseURL = config.params._baseUrl
        delete config.params._baseUrl
      }
    } else {
      config.params = {}
    }

    // 当且仅当请求类型为post并且请求格式为表单形式时将参数序列化
    if (
      config.method === 'post' &&
      config.headers['Content-Type'] === DefaultContentType &&
      config.data.constructor !== FormData
    ) {
      config.data = stringify(config.data)
    }
    if (config.onLoad) {
      config.timeout = 100000
      delete config.onLoad
    }
    return config
  },
  error => Promise.reject(error)
)

// 添加一个响应拦截器
instance.interceptors.response.use(
  response => {
    const disposition = response.headers['content-disposition']
    if (disposition) {
      const fileBlob = new Blob([response.data])
      const fileName = decodeURIComponent(
        disposition.split(';')[1].split('filename=')[1]
      )
      const link = document.createElement('a')
      link.href = URL.createObjectURL(fileBlob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
      return fileBlob
    }
    if (
      ~response.config.url.indexOf(loginApi) ||
      ~response.config.url.indexOf(loginMockApi)
    ) {
      const name = response.headers.customname
      if (name) {
        localStorage.setItem('CUSTOM_NAME', name)
      }
    }
    if (response.headers.token) {
      const token = response.headers.token
      localStorage.setItem('RETOKEN', token)
    }
    return response
  },
  error => Promise.reject(error)
)

// 将请求数据的方式包装成一个对象
const api = {}
const likeGet = ['delete', 'get', 'head', 'options']
const likePost = ['post', 'put', 'patch']

api.request = function (...args) {
  const _arguments = Array.prototype.slice.call(args)
  const isPost = _arguments[0]
  const method = _arguments[1]
  const url = _arguments[2]
  const data = _arguments[3] || {}
  const config = { method, url }
  config[isPost ? 'data' : 'params'] = buildData(data)

  return new Promise((resolve, reject) => {
    instance
      .request(config)
      .then(res => {
        if (res.data) {
          res.data.code === 200 ? resolve(res.data) : reject(res.data)
        } else {
          message.error((res && (res.msg || res.message)) || '请求失败')
          // reject(res)
        }
      })
      .catch(err => {
        message.error((err && (err.msg || err.message)) || '请求失败')
        // reject(err)
      })
  })
}

likeGet.forEach(method => {
  api[method] = function (...argus) {
    return api.request(false, method, ...argus)
  }
})

likePost.forEach(method => {
  api[method] = function (...argus) {
    return api.request(true, method, ...argus)
  }
})

export default api
