import React, { Fragment } from 'react'
import p01 from './01'
import p02 from './02'
import p03 from './03'

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
            r.push(<span className='glb-cd'>{inText}</span>)
          })
        } else {
          r.push(<span className='glb-cd'>{str}</span>)
        }
        r.push(text)
      } else {
        r.push(v)
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
                  inlineR.push(str)
                }
                inlineR.push(text)
              } else {
                inlineR.push(v)
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

export default [p01, p02, p03].map(v => build(v))
