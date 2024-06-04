import React, { memo } from 'react'
import './Box.styl'

const Box = ({ children }) => (
  <div className='com-box hide-scroll'>
    <div className='com-box_content'>
      <div className='com-box_body'>{children}</div>
    </div>
  </div>
)

export default memo(Box)
