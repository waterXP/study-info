import React, { memo } from 'react'
import './Switch.styl'

const Switch = ({ children, checked, onClick }) => (
  <div
    className={
      checked
        ? 'pg-jp-words_switch is-checked on-click'
        : 'pg-jp-words_switch on-click'
    }
    onClick={onClick}
  >
    {children}
  </div>
)

export default memo(Switch)
