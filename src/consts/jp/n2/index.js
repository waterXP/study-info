import React, { Fragment } from 'react'
import y01 from './y01'
import y02 from './y02'
import y03 from './y03'
import y04 from './y04'
import y05 from './y05'
import y06 from './y06'
import y07 from './y07'
import y08 from './y08'
import y09 from './y09'
import y10 from './y10'
import y11 from './y11'
import y12 from './y12'
import y13 from './y13'
import y14 from './y14'
import y15 from './y15'
import y16 from './y16'
import y17 from './y17'
import y18 from './y18'
import y19 from './y19'
import y20 from './y20'

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
const build = (arr, index) =>
  arr.map(({ title, explain, example, ...rest }, arrIndex) => {
    i = 0
    return {
      title: trans(title),
      explain: explain.map(v => trans(v)),
      example: trans(example),
      ...rest,
      id: `y${index}-${arrIndex}`
    }
  })

export default [
  y01,
  y02,
  y03,
  y04,
  y05,
  y06,
  y07,
  y08,
  y09,
  y10,
  y11,
  y12,
  y13,
  y14,
  y15,
  y16,
  y17,
  y18,
  y19,
  y20
].map((v, i) => build(v, i))
