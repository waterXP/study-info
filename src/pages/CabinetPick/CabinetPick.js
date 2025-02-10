import React, { memo, useState, useEffect, useCallback } from 'react'
import './CabinetPick.styl'
import CabinetBody from '@/components/CabinetBody'
import { findUser } from '@/api/expressLocker'

const CabinetPick = ({ onUrl, userInfo }) => {
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
  const [hasOthers, setHasOthers] = useState(true)
  useEffect(() => {
    setHasOthers(Math.random() > 0.5)
  }, [])
  const handleReturn = useCallback(() => {
    if (hasOthers) {
      onUrl('pick-list')
    } else {
      onUrl('')
    }
  }, [hasOthers, onUrl])
  const onOpen = useCallback(() => {
    // open again
    findUser({ phoneSuffix: 1821 }).then(d => {
      console.log(d)
    })
  }, [])
  return (
    <CabinetBody
      onReturn={handleReturn}
      delay={300}
      onUrl={onUrl}
      userInfo={userInfo}
    >
      <div className='pg-cabinet-pick'>
        <div className='pg-cabinet-pick_body'>
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
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPick)
