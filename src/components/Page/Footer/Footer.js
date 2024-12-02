import React, { memo } from 'react'
import './Footer.styl'

const Footer = ({ onPrevClick, onNextClick, children }) => (
  <div className='com-footer'>
    {children}
    <div className='com-footer_buttons'>
      {onPrevClick && (
        <div
          className='com-footer_corner-button on-click'
          onClick={onPrevClick}
        >
          上一个
        </div>
      )}
      {onNextClick && (
        <div
          className='com-footer_corner-button is-right on-click'
          onClick={onNextClick}
        >
          下一个
        </div>
      )}
    </div>
  </div>
)

export default memo(Footer)
