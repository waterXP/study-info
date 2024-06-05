import React, { memo } from 'react'
import './Switch.styl'

const Switch = ({ children, checked, onClick }) => (
  <div
    className={
      checked
        ? 'pg-jp-words_switch is-checked is-clickable'
        : 'pg-jp-words_switch is-clickable'
    }
    onClick={onClick}
  >
    {children}
  </div>
)

export default memo(Switch)
