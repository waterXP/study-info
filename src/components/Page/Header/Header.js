import React, { memo } from 'react'
import './Header.styl'
import Breadcrumb from '@com/Breadcrumb'

const Header = ({ to, ex, ls, qa, title, children }) => (
  <div className='com-page-header'>
    <Breadcrumb to={to} noTop qa={qa} ex={ex} ls={ls} title={title}>
      返回
    </Breadcrumb>
    {children}
  </div>
)

export default memo(Header)
