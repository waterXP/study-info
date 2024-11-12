import React, { memo, useMemo } from 'react'
import './JPText.styl'
import { useSelector } from 'react-redux'

const JPText = ({ className, content, kana, mana }) => {
  const displayType = useSelector(
    ({ displayType }) => displayType
  )
  const r = useMemo(
    () => {
      if (kana) {
        if (mana) {
          if (displayType === 'kana') {
            return kana
          }
          if (displayType === 'mana') {
            return mana
          }
          return `<ruby>${mana}<rp>「</rp><rt>${kana}</rt><rp>」</rp></ruby>`
        }
        return kana
      }
      if (content) {
        return content.replace(/<(.*?)>/g, (_, txt) => {
          const splits = txt.split(',')
          const mana = splits.slice(0, splits.length - 1).join(',')
          const kana = splits[splits.length - 1]
          if (displayType === 'kana') {
            return kana
          }
          if (displayType === 'mana') {
            return mana
          }
          return `<ruby>${mana}<rp>「</rp><rt>${kana}</rt><rp>」</rp></ruby>`
        })
      }
      return ''
    },
    [content, kana, mana, displayType]
  )

  return <span className={className} dangerouslySetInnerHTML={{ __html: r }} />
}

export default memo(JPText)
