import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Detail.styl'
import nouns from '@/consts/nouns'

const Detail = ({ id, important }) => {
  const content = useMemo(
    () => {
      if (id && nouns[id]) {
        return nouns[id].content || null
      }
      return null
    },
    [id]
  )

  const cItemName = useMemo(
    () => important ? 'com-detail--item is-important' : 'com-detail--item',
    [important]
  )

  if (content) {
    return <div className='com-detail'>
      {
        content.map(
          (v, i) => <p key={`${id}--${i}`} className={cItemName}>
            { v }
          </p>
        )
      }
    </div>
  }
  return null
}
Detail.propTypes = {
}

export default memo(Detail)
