import React, { forwardRef, memo } from 'react'
import './Box.styl'

const Box = forwardRef(({ children, noTop }, ref) => (
  <div className='com-box hide-scroll'>
    <div className={noTop ? 'com-box_content no-top' : 'com-box_content'}>
      <div ref={ref} className='com-box_body'>
        {children}
      </div>
    </div>
  </div>
))

export default memo(Box)
