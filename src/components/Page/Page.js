import React, { memo } from 'react'
import './Page.styl'

const Page = ({ children }) => (
  <div className='com-page hide-scroll'>{children}</div>
)

export default memo(Page)
