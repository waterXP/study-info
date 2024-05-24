import React, { memo } from 'react'
import './Paragraph.styl'
import Topic from '@com/Topic'

const Paragraph = ({ content, title, shortTip }) =>
  content && (
    <div className='com-paragraph'>
      {title && <p className='com-paragraph_title'>{title}</p>}
      {content.map((v, i) =>
        shortTip ? (
          <Topic key={i} title={v.title} content={v.content} />
        ) : (
          <Topic key={i} title={v.title} />
        )
      )}
    </div>
  )

export default memo(Paragraph)
