import React, { memo, useCallback } from 'react'
import './Cabinet.styl'
import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'

const Cabinet = () => {
  const navigate = useNavigate()
  const gotoSave = useCallback(() => {
    navigate('/save-query')
  }, [navigate])
  const gotoPick = useCallback(() => {
    navigate('/pick-list')
  }, [navigate])
  const gotoCode = useCallback(() => {
    navigate('/pick-code')
  }, [navigate])
  return (
    <CabinetBody>
      <div className='pg-cabinet'>
        <div className='pg-cabinet_header'>
          <div className='pg-cabinet_header-left'>
            <Icon className='pg-cabinet_header-icon' type='icon-mall-l' />
            <span className='pg-cabinet_header-title'>智慧快递柜</span>
          </div>
        </div>
        <div className='pg-cabinet_body'>
          <div className='pg-cabinet_save on-click' onClick={gotoSave}>
            <img className='pg-cabinet_save-image' src='/assets/tst.png' alt='save' />
            <span className='pg-cabinet_text'>存件</span>
            <span className='pg-cabinet_tip'>快速存放您的包裹</span>
          </div>
          <div className='pg-cabinet_pick'>
            <div className='pg-cabinet_pick-self on-click' onClick={gotoPick}>
              <span className='pg-cabinet_text'>取件</span>
              <span className='pg-cabinet_tip'>便捷取出您的包裹</span>
            </div>
            <div className='pg-cabinet_pick-others on-click' onClick={gotoCode}>
              <span className='pg-cabinet_text'>代取件</span>
              <span className='pg-cabinet_tip'>帮他人代取包裹</span>
            </div>
          </div>
        </div>
        <div className='pg-cabinet_footer'>
          <div className='pg-cabinet_footer-version'>
            <span className='pg-cabinet_footer-text'>系统版本: v1.0.0</span>
            <span className='pg-cabinet_footer-text'>
              客服电话: 400-888-8888
            </span>
          </div>
          <span className='pg-cabinet_footer-right'>
            © 2024 智慧快递柜 版权所有
          </span>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(Cabinet)
