import React, { memo, useMemo, useCallback } from 'react'
import './CabinetPick.styl'
import CabinetBody from '@/components/CabinetBody'

const CabinetPick = ({ onUrl, userInfo, doorInfo, reOpen, hasOthers }) => {
  const { boxName, status } = useMemo(() => doorInfo || {}, [doorInfo])
  const handleReturn = useCallback(() => {
    if (hasOthers) {
      onUrl('pick-list')
    } else {
      onUrl('')
    }
  }, [hasOthers, onUrl])
  const onOpen = useCallback(() => {
    reOpen()
  }, [reOpen])
  return (
    <CabinetBody
      onReturn={handleReturn}
      delay={300}
      onUrl={onUrl}
      userInfo={userInfo}
    >
      <div className='pg-cabinet-pick'>
        <div className='pg-cabinet-pick_body'>
          {boxName && <div className='pg-cabinet-pick_box'>{boxName}</div>}
          <p className='pg-cabinet-pick_tip'>
            {status === 'open'
              ? `${boxName}门已打开，完成取件后请关闭箱门。`
              : `${boxName}门已关闭`}
          </p>
          {/* {status === 'close' && ( */}
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
          {/* )} */}
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPick)
