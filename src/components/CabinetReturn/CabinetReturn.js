import React, { memo } from 'react'
import './CabinetReturn.styl'
import Icon from '@com/Icon'

const CabinetReturn = () => <div className='cabinet-return'>
  <Icon type='icon-fanhui' />
  <span>返回</span>
</div>

export default memo(CabinetReturn)
