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
import p17 from './17'
import p18 from './18'
import p19 from './19'
import p20 from './20'
import p21 from './21'
import p22 from './22'
import p23 from './23'
import p24 from './24'
import p25 from './25'
import p26 from './26'
import p27 from './27'
import p28 from './28'
import p29 from './29'
import p30 from './30'
import p31 from './31'
import p32 from './32'
import p33 from './33'
import p34 from './34'
import p35 from './35'
import p36 from './36'
import p37 from './37'
import p38 from './38'
import p39 from './39'
import p40 from './40'
import p41 from './41'
import p42 from './42'
import p43 from './43'
import p44 from './44'
import p45 from './45'
import p46 from './46'
import p47 from './47'
import p48 from './48'

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
  p16,
  p17,
  p18,
  p19,
  p20,
  p21,
  p22,
  p23,
  p24,
  p25,
  p26,
  p27,
  p28,
  p29,
  p30,
  p31,
  p32,
  p33,
  p34,
  p35,
  p36,
  p37,
  p38,
  p39,
  p40,
  p41,
  p42,
  p43,
  p44,
  p45,
  p46,
  p47,
  p48
].map(v => build(v))
