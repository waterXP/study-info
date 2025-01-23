import React, { memo } from 'react'
import './CabinetPickList.styl'
import CabinetReturn from '@/components/CabinetReturn'
import Icon from '@/components/Icon'

const CabinetPickList = () => <div className='cabinet-pick-list'>
  <CabinetReturn />
  <p>你有3个快递待取</p>
  <div>
    <Icon type='icon-sanjiaoleft' />
    <div>07号箱</div>
    <div>08号箱</div>
    <div>12号箱</div>
    <Icon type='icon-sanjiaoright' />
  </div>
</div>

export default memo(CabinetPickList)
