import React, { memo, useState, useEffect, useCallback } from 'react'
import './CabinetPick.styl'
import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'

const CabinetPick = () => {
  const [status, setStatus] = useState({
    title: '',
    tip: '数据处理中……'
  })
  useEffect(() => {
    // do open
    setStatus({
      title: '08号箱门',
      tip: '08号箱门已打开，完成取件后请关闭箱门。'
    })
  }, [])
  const navigate = useNavigate()
  const [hasOthers, setHasOthers] = useState(true)
  useEffect(() => {
    setHasOthers(Math.random() > 0.5)
  }, [])
  const handleReturn = useCallback(() => {
    if (hasOthers) {
      navigate('/pick-list')
    } else {
      navigate('/')
    }
  }, [hasOthers, navigate])
  const onOpen = useCallback(() => {
    // open again
  }, [])
  return (
    <CabinetBody onReturn={handleReturn} delay={300}>
      <div className='pg-cabinet-pick'>
        {status.title && (
          <div className='pg-cabinet-pick_box'>{status.title}</div>
        )}
        <p className='pg-cabinet-pick_tip'>{status.tip}</p>
        {status.title && (
          <div className='pg-cabinet-pick_buttons'>
            <div className='pg-cabinet-pick_button on-click' onClick={onOpen}>
              再次开箱
            </div>
            <div
              className='pg-cabinet-pick_button on-click'
              onClick={handleReturn}
            >
              完成取件
            </div>
          </div>
        )}
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPick)
