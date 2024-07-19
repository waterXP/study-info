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

export const setStorage = (key, obj) => localStorage.setItem(
  key,
  toJSON(obj)
)

export default null
