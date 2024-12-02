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
      return list[[index < list.length - 1 ? index + 1 : 0]]
    }
  }
  return null
}

export default null
