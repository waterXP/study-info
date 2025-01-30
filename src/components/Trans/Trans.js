import React, { memo } from 'react'
import './Trans.styl'
import { trans } from '@/utils/tool'

const Trans = ({ text, className }) => {
  if (Array.isArray(text)) {
    return text.map((v, i) => (
      <p key={i} className={className}>
        {trans([v])}
      </p>
    ))
  }
  return trans([text])
}

export default memo(Trans)
