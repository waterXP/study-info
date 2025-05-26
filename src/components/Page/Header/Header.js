import React, { memo } from 'react'
import './Header.styl'
import Breadcrumb from '@com/Breadcrumb'

const Header = ({ ai, to, ex, ls, qa, title, type, hideDefault, children }) => (
  <div className='com-page-header'>
    <Breadcrumb
      to={to}
      noTop
      qa={qa}
      ex={ex}
      ls={ls}
      title={title}
      hideDefault={hideDefault}
      ai={ai}
      type={type}
    >
      返回
    </Breadcrumb>
    {children}
  </div>
)

export default memo(Header)
