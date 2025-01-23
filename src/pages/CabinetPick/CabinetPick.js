import React, { memo } from 'react'
import './CabinetPick.styl'
import CabinetReturn from '@/components/CabinetReturn'

const CabinetPick = () => (
  <div className='cabinet-pick'>
    <CabinetReturn />
    <p>完成取件后，开锁倒计时5s后返回首页</p>
    <p>如果有多个倒计时结束返回列表</p>
    <div>08号箱门</div>
    <p>08号箱门已打开，完成取件后请关闭箱门。</p>
    <div>
      <div>再次开箱</div>
      <div>完成取件</div>
    </div>
  </div>
)

export default memo(CabinetPick)
