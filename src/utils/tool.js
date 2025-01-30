import React, { Fragment } from 'react'
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

export const copyToClipboard = value => {
  if (typeof value === 'string') {
    const text = value
      .replace(/<<|>>/g, '')
      .replace(/\(\((.*?),(.*?)\)\)/g, (_, txt) => txt)
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

const chDelete = str => {
  if (typeof str === 'string' && str.includes('[[') && str.includes(']]')) {
    const r = []
    str.split('[[').forEach(v => {
      if (v.includes(']]')) {
        const [str, text] = v.split(']]')
        if (str.includes('((')) {
          str.split('((').forEach(v => {
            const [inStr, inText] = v.split('))')
            const [mana, kana] = inStr.split(',')
            if (mana && kana) {
              r.push(
                <span className='glb-delete'>
                  <ruby>
                    {mana}
                    <rp>「</rp>
                    <rt>{kana}</rt>
                    <rp>」</rp>
                  </ruby>
                </span>
              )
            } else {
              r.push(<span className='glb-delete'>{inStr}</span>)
            }
            r.push(<span className='glb-delete'>{chDelete(inText)}</span>)
          })
        } else {
          r.push(<span className='glb-delete'>{str}</span>)
          r.push(text)
        }
      } else {
        r.push(v)
      }
    })
    return r
  }
  return str
}
let i = 0
export const trans = arr => {
  i = 0
  return arr.map(line => {
    const r = []
    line.split('<<').forEach(v => {
      if (v.includes('>>')) {
        const [str, text] = v.split('>>')
        if (str.includes('((')) {
          str.split('((').forEach(v => {
            const [inStr, inText] = v.split('))')
            const [mana, kana] = inStr.split(',')
            if (mana && kana) {
              r.push(
                <span className='glb-cd'>
                  <ruby>
                    {mana}
                    <rp>「</rp>
                    <rt>{kana}</rt>
                    <rp>」</rp>
                  </ruby>
                </span>
              )
            } else {
              r.push(<span className='glb-cd'>{inStr}</span>)
            }
            r.push(<span className='glb-cd'>{chDelete(inText)}</span>)
          })
        } else if (Array.isArray(chDelete(str))) {
          r.push(
            <span className='glb-cd'>
              {chDelete(str).map(v => (
                <Fragment key={i++}>{v}</Fragment>
              ))}
            </span>
          )
        } else {
          r.push(<span className='glb-cd'>{chDelete(str)}</span>)
        }
        r.push(chDelete(text))
      } else {
        r.push(chDelete(v))
      }
    })
    return (
      <Fragment key={i++}>
        {r.map(line => {
          if (typeof line === 'string') {
            const inlineR = []
            line.split('((').forEach(v => {
              if (v.includes('))')) {
                const [str, text] = v.split('))')
                const [mana, kana] = str.split(',')
                if (mana && kana) {
                  inlineR.push(
                    <ruby>
                      {mana}
                      <rp>「</rp>
                      <rt>{kana}</rt>
                      <rp>」</rp>
                    </ruby>
                  )
                } else {
                  inlineR.push(chDelete(str))
                }
                inlineR.push(chDelete(text))
              } else {
                inlineR.push(chDelete(v))
              }
            })
            return (
              <Fragment key={i++}>
                {inlineR.map(line => (
                  <Fragment key={i++}>{line}</Fragment>
                ))}
              </Fragment>
            )
          }
          if (Array.isArray(line)) {
            return (
              <Fragment key={i++}>
                {line.map(v => (
                  <Fragment key={i++}>{v}</Fragment>
                ))}
              </Fragment>
            )
          }
          return <Fragment key={i++}>{line}</Fragment>
        })}
      </Fragment>
    )
  })
}

export default null
