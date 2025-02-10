import axios from 'axios'
import { stringify } from 'qs'
// import jsMd5 from 'js-md5'
import CryptoJS from 'crypto-js'

// const Encrypt = () => {
//   const iv = 'xfw2023yydsl@#!$'
//   const loginInfo = JSON.parse(localStorage.getItem('LOGIN_INFO') || '{}')
//   const encrypted = CryptoJS.AES.encrypt(
//     loginInfo.dingUserId,
//     CryptoJS.enc.Utf8.parse(iv),
//     {
//       iv: CryptoJS.enc.Utf8.parse(iv),
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     }
//   )
//   return encrypted.toString()
// }

// 加密函数，直接修改对象，无返回
// function encipher(data = {}, nature = '', target = 'sign') {
//   const secret = 'sq2019'
//   data[target] = jsMd5(data[nature] + secret)
//   return data[target]
// }

function getParamsStr2(params) {
  var sortedKeys = Object.keys(params).sort()
  var str = ''
  sortedKeys.forEach(key => {
    str = str + params[key]
  })
  return str
}
function getSign2(params) {
  var app_key = 'dingjasudvtsjkbuygl3'
  var app_secret =
    'PlSqxPrsa3cE1ms-TW_xwuBT3-Fy2Q1wcjcdLgkqOyiGQ1WejB0AMtKRdUDy3CDr'
  var timeStamp = new Date().getTime()
  params.appKey = app_key
  params.appSecret = app_secret
  params.timeStamp = timeStamp
  var str = getParamsStr2(params)
  console.log('str after 2')
  console.log(str)
  Object.defineProperty(params, 'appSecret', { enumerable: false })
  var sign = '' + CryptoJS.MD5(str)
  return sign
}

const getParamsStr = params => {
  const sortedKeys = Object.keys(params).sort()
  let str = ''
  sortedKeys.forEach(key => {
    str += params[key]
  })
  return str
}

const getSign = params => {
  params.appKey = 'dingjasudvtsjkbuygl3'
  params.timeStamp = Date.now()
  const str = getParamsStr({
    ...params,
    appKey: 'dingjasudvtsjkbuygl3',
    appSecret:
      'PlSqxPrsa3cE1ms-TW_xwuBT3-Fy2Q1wcjcdLgkqOyiGQ1WejB0AMtKRdUDy3CDr',
    timeStamp: Date.now()
  })
  console.log('str after 1')
  console.log(str)
  Object.defineProperty(params, 'appSecret', { enumerable: false })
  return CryptoJS.MD5(str).toString()
}

const buildData = ori => {
  const params = { ...(ori || {}) }
  // const sign = getSign(params)
  params.sign = getSign(params)
  // delete params.appSecret
  // params.appSecret =
  //   'PlSqxPrsa3cE1ms-TW_xwuBT3-Fy2Q1wcjcdLgkqOyiGQ1WejB0AMtKRdUDy3CDr'
  return params
}

const loginApi = '/user/mockLogin'
const loginMockApi = '/user/login'

// 默认请求格式
const DefaultContentType = 'application/x-www-form-urlencoded;charset=UTF-8'
const baseURL = 'http://221.12.170.114:30009/api'

const instance = axios.create({
  baseURL,
  timeout: 20000, // 默认20s，对特定需要配置的接口只需要配置自定义字段
  withCredentials: false,
  responseType: 'json',
  headers: { 'Content-Type': DefaultContentType },
  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus(status) {
    return status >= 200 && status < 300 // default
  }
})

const extraParams = [
  { name: '__platform', value: 'pc' },
  { name: 'versionNumber', value: 3 }
]

// 添加一个请求拦截器
instance.interceptors.request.use(
  config => {
    // 配置 rap2 模拟数据, 配置请求参数
    if (config.method === 'post') {
      if (config.data) {
        if (config.data._baseUrl) {
          config.baseURL = config.data._baseUrl
          delete config.data._baseUrl
        }
        extraParams.forEach(v => {
          config.data[v.name] = v.value
        })
      } else {
        const _data = {}
        extraParams.forEach(v => {
          _data[v.name] = v.value
        })
        config.data = _data
      }
    } else if (config.params) {
      if (config.params._baseUrl || config.params._baseUrl !== undefined) {
        config.baseURL = config.params._baseUrl
        delete config.params._baseUrl
      }
      extraParams.forEach(v => {
        config.params[v.name] = v.value
      })
    } else {
      const _data = {}
      extraParams.forEach(v => {
        _data[v.name] = v.value
      })
      config.params = _data
    }

    // 当且仅当请求类型为post并且请求格式为表单形式时将参数序列化
    if (
      config.method === 'post' &&
      config.headers['Content-Type'] === DefaultContentType &&
      config.data.constructor !== FormData
    ) {
      config.data = stringify(config.data)
    }
    // 添加头部字段customname
    // if (
    //   !config.headers.customname &&
    //   !config.url.includes(loginApi) &&
    //   !config.url.includes(loginMockApi)
    // ) {
    //   const customname = localStorage.getItem('CUSTOM_NAME')
    //   config.headers.customname = customname
    // }
    // if (!config.headers.token) {
    //   config.headers.token = localStorage.getItem('RETOKEN')
    // }
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
  // const other =
  //   _arguments[4] === 'useJSON'
  //     ? { headers: { 'Content-Type': 'application/json' } }
  //     : _arguments[4] || {}
  const config = { method, url }
  // if (typeof other === 'string') {
  //   const sign = encipher(data, other)
  //   config.headers = { ...(config.headers || {}), sign }
  // } else {
  //   if (other.sign) {
  //     const sign = encipher(data, other.sign)
  //     delete other.sign
  //     other.headers = { ...(other.headers || {}), sign }
  //   }
  //   if (other.onUploadProgress) {
  //     config.onUploadProgress = other.onUploadProgress
  //   }
  //   Object.assign(config, other)
  // }
  console.log(getSign2({ phoneSuffix: 1821 }))
  config[isPost ? 'data' : 'params'] = buildData(data)

  return new Promise((resolve, reject) => {
    instance
      .request(config)
      .then(res => {
        if (res.data) {
          res.data.code === 200 ? resolve(res.data) : reject(res.data)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
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
