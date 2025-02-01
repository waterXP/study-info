import React, { memo } from 'react'
import './Footer.styl'

const Footer = ({
  onPrevClick,
  onNextClick,
  onCenterClick,
  centerText,
  children,
  buttons,
  onButtons
}) => (
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
      {onCenterClick && (
        <div
          className='com-footer_corner-center on-click'
          onClick={onCenterClick}
        >
          {centerText}
        </div>
      )}
      {buttons && (
        <div className='com-footer_center-buttons'>
          {buttons.map(({ value, text }) => (
            <div
              key={value}
              className='com-footer_center-button on-click'
              onClick={() => {
                onButtons(value)
              }}
            >
              {text}
            </div>
          ))}
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
