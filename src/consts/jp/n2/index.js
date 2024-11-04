import React, { Fragment } from 'react'
import y01 from './y01'
import y02 from './y02'

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
const trans = arr =>
  arr.map(line => {
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
        } else {
          if (Array.isArray(chDelete(str))) {
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
        }
        r.push(chDelete(text))
      } else {
        r.push(chDelete(v))
      }
    })
    return (
      <>
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
      </>
    )
  })
const build = arr =>
  arr.map(({ title, explain, example, ...rest }) => {
    i = 0
    return {
      title: trans(title),
      explain: explain.map(v => trans(v)),
      example: trans(example),
      ...rest
    }
  })

export default [
  y01,
  y02
].map(v => build(v))
