import React, { memo } from 'react'
import './Item.styl'

const Item = ({ children, onClick }) => (
  <div
    className={onClick ? 'com-item is-clickable' : 'com-item'}
    onClick={onClick}
  >
    {children}
  </div>
)

export default memo(Item)
