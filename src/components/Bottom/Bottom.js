import React, { memo, useCallback } from 'react'
import './Bottom.styl'

const Bottom = ({ list, flag = 'id', current, onClick }) => {
  const onPrevClick = useCallback(() => {
    const len = list.length
    if (len > 0) {
      const index = list.findIndex(v => v[flag] === current)
      if (~index) {
        const prev = index > 0 ? index - 1 : len - 1
        onClick(list[prev])
      }
    }
  }, [current, list, flag, onClick])
  const onNextClick = useCallback(() => {
    const len = list.length
    if (len > 0) {
      const index = list.findIndex(v => v[flag] === current)
      if (~index) {
        const next = index < len - 1 ? index + 1 : 0
        onClick(list[next])
      }
    }
  }, [current, list, flag, onClick])
  return (
    <div className='com-bottom'>
      <div className='com-bottom_buttons'>
        <div
          className='com-bottom_corner-button on-click'
          onClick={onPrevClick}
        >
          上一个
        </div>
        <div
          className='com-bottom_corner-button is-right on-click'
          onClick={onNextClick}
        >
          下一个
        </div>
      </div>
    </div>
  )
}

export default memo(Bottom)
