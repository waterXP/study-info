import React, { Fragment } from 'react'
import p01 from './01'
import p02 from './02'
import p03 from './03'
import p04 from './04'
import p05 from './05'
import p06 from './06'
import p07 from './07'
import p08 from './08'
import p09 from './09'
import p10 from './10'
import p11 from './11'
import p12 from './12'
import p13 from './13'
import p14 from './14'
import p15 from './15'
import p16 from './16'

const chDelete = str => {
  if (typeof str === 'string' && str.includes('[[') && str.includes(']]')) {
    const r = []
    str.split('[[').forEach(v => {
      if (v.includes(']]')) {
        const [str, text] = v.split(']]')
        r.push(<span className='glb-delete'>{str}</span>)
        r.push(text)
      } else {
        r.push(v)
      }
    })
    return r
  }
  return str
}

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
          r.push(<span className='glb-cd'>{chDelete(str)}</span>)
        }
        r.push(chDelete(text))
      } else {
        r.push(chDelete(v))
      }
    })
    return (
      <>
        {r.map((line, i) => {
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
              <Fragment key={i}>
                {inlineR.map((line, i) => (
                  <Fragment key={i}>{line}</Fragment>
                ))}
              </Fragment>
            )
          }
          return <Fragment key={i}>{line}</Fragment>
        })}
      </>
    )
  })
const build = arr =>
  arr.map(({ title, explain, example, ...rest }) => ({
    title: trans(title),
    explain: explain.map(v => trans(v)),
    example: trans(example),
    ...rest
  }))

export default [
  p01,
  p02,
  p03,
  p04,
  p05,
  p06,
  p07,
  p08,
  p09,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16
].map(v => build(v))
