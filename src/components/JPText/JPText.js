import React, { memo, useMemo, Fragment } from 'react'
import './JPText.styl'

const JPText = ({ content }) => {
  const r = useMemo(
    () =>
      content.replace(/<(.*?)>/g, (_, txt) => {
        const [mana, kana] = txt.split(',')
        console.log(
          <ruby>
            {mana}
            <rp>「</rp>
            <rt>{kana}</rt>
            <rp>」</rp>
          </ruby>
        )
        return `<ruby>${mana}<rp>「</rp><rt>${kana}</rt><rp>」</rp></ruby>`
      }),
    [content]
  )

  return <span dangerouslySetInnerHTML={{ __html: r }} />
}

export default memo(JPText)
