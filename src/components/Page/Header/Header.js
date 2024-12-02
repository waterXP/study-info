import React, { memo } from 'react'
import './Header.styl'
import Breadcrumb from '@com/Breadcrumb'

const Header = ({ to, ls }) => (
  <div className='com-page-header'>
    <Breadcrumb to={to} noTop ls={ls}>
      返回
    </Breadcrumb>
  </div>
)

export default memo(Header)
