import React, { memo } from 'react'
import './Content.styl'

const Content = ({ children, hasFooter }) => (
  <div className={hasFooter ? 'com-content' : 'com-content has-bottom'}>
    {children}
  </div>
)

export default memo(Content)
