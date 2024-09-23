import React, { Fragment } from 'react'
import p01 from './01'

const getTitle = titles => titles.map(
  title => {
    const r = []
    console.log('title', title)
    title.split('<<').forEach(
      v => {
        if (v.includes('>>')) {
          const [str, text] = v.split('>>')
          r.push(<span>{str}</span>)
          r.push(text)
        } else {
          r.push(v)
        }
      }
    )
    return <>
      {
        r.map((v, i) => <Fragment id={i}>{v}</Fragment>)
      }
    </>
  }
)


const build = arr => arr.map(
  ({ title, explain, example, ...rest }) => ({
    title: getTitle(title),
    explain,
    example,
    ...rest
  })
)

export default [
  ...build(p01)
]
