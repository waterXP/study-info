import React, { memo, useCallback } from 'react'
import './Cabinet.styl'
import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'

const Cabinet = () => {
  const navigate = useNavigate()
  const gotoSave = useCallback(() => {
    navigate('/cabinet-save-query')
  }, [navigate])
  const gotoPick = useCallback(() => {
    navigate('/cabinet-pick-list')
  }, [navigate])
  const gotoCode = useCallback(() => {
    navigate('/cabinet-pick-code')
  }, [navigate])
  return (
    <CabinetBody>
      <div className='pg-cabinet'>
        <div className='pg-cabinet_save on-click' onClick={gotoSave}>
          <span className='pg-cabinet_text'>存件</span>
        </div>
        <div className='pg-cabinet_pick'>
          <div className='pg-cabinet_pick-self on-click' onClick={gotoPick}>
            <span className='pg-cabinet_text'>取件</span>
          </div>
          <div className='pg-cabinet_pick-others on-click' onClick={gotoCode}>
            <span className='pg-cabinet_text'>代取件</span>
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(Cabinet)
