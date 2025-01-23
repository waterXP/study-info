import React, { memo } from 'react'
import './CabinetSave.styl'
import CabinetReturn from '@/components/CabinetReturn'

const CabinetSave = () => (
  <div className='cabinet-pick'>
    <CabinetReturn />
    <p>开箱存件</p>
    <div>08号箱门</div>
    <p>
      <span>箱门已经打开，请放好快递后关门，</span>
      <span>关门后自动完成存件</span>
    </p>
    <div>
      <div>再次开箱</div>
      <div>继续存件</div>
      <div>返回首页</div>
    </div>
  </div>
)

export default memo(CabinetSave)
