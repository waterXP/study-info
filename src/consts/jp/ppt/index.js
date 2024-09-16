import React from 'react'
import p01 from './01'

const getTitle = title => title.map(
  v => v.replace(
    /<<.*?>>/g, str => <span>{str}</span>
  )
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
