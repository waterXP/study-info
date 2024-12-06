import { message } from 'antd'

export const fromJSON = json => {
  let r = ''
  try {
    r = JSON.parse(json)
  } catch (e) {
    r = null
  }
  return r
}
export const toJSON = string => {
  let r = ''
  try {
    r = JSON.stringify(string)
  } catch (e) {
    r = null
  }
  return r
}

export const getStorage = key => fromJSON(localStorage.getItem(key) || {})

export const setStorage = (key, obj) => localStorage.setItem(key, toJSON(obj))

export const getPrev = (info, list) => {
  if (info) {
    const { id } = info
    const index = list.findIndex(v => v.id === id)
    if (~index) {
      return list[index > 0 ? index - 1 : list.length - 1]
    }
  }
  return null
}

export const getNext = (info, list) => {
  if (info) {
    const { id } = info
    const index = list.findIndex(v => v.id === id)
    if (~index) {
      return list[index < list.length - 1 ? index + 1 : 0]
    }
  }
  return null
}

export const getPrevIndex = (info, list) => {
  if (info) {
    const { id } = info
    const index = list.findIndex(v => v.id === id)
    if (~index) {
      return index > 0 ? index - 1 : list.length - 1
    }
  }
  return null
}

export const getNextIndex = (info, list) => {
  if (info) {
    const { id } = info
    const index = list.findIndex(v => v.id === id)
    if (~index) {
      return index < list.length - 1 ? index + 1 : 0
    }
  }
  return null
}

export const copyToClipboard = value => {
  if (typeof value === 'string') {
    const text = value.replace(/<<|>>/g, '').replace(/\(\((.*?),(.*?)\)\)/g, (_, txt) => txt)
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        message.success('已复制')
      })
    } else if (document.execCommand('Copy')) {
      const oInput = document.createElement('input')
      oInput.value = text
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.style.display = 'none'
      message.success('已复制')
    }
  }
}

export default null
