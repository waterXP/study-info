import React, { memo, useMemo, Fragment } from 'react'
import './JPText.styl'

const JPText = ({ content }) => {
  const r = useMemo(
    () =>
      content.replace(/<(.*?)>/g, (_, txt) => {
        const splits = txt.split(',')
        const mana = splits.slice(0, splits.length - 1).join(',')
        const kana = splits[splits.length - 1]
        return `<ruby>${mana}<rp>「</rp><rt>${kana}</rt><rp>」</rp></ruby>`
      }),
    [content]
  )

  return <span dangerouslySetInnerHTML={{ __html: r }} />
}

export default memo(JPText)
