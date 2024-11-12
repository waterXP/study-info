import React, { memo } from 'react'
import './Switch.styl'

const Switch = ({ children, checked, onClick }) => (
  <div
    className={
      checked
        ? 'com-word-switch is-checked on-click'
        : 'com-word-switch on-click'
    }
    onClick={onClick}
  >
    {children}
  </div>
)

export default memo(Switch)
