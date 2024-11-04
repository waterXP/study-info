import React, { forwardRef, memo } from 'react'
import './Box.styl'

const Box = forwardRef(({ children }, ref) => (
  <div className='com-box hide-scroll'>
    <div className='com-box_content'>
      <div ref={ref} className='com-box_body'>{children}</div>
    </div>
  </div>
))

export default memo(Box)
