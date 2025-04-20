import React, { memo, useMemo, useCallback } from 'react'
import './CabinetCodeResult.styl'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'

const CabinetCodeResult = ({ onUrl, userInfo, doorInfo, reOpen }) => {
// const CabinetCodeResult = ({ onUrl, userInfo, doorInfo, reOpen, hasOthers }) => {
  const { boxName, status } = useMemo(() => doorInfo || {}, [doorInfo])
  const handleReturn = useCallback(() => {
    onUrl('')
    // if (hasOthers) {
    //   onUrl('pick-list')
    // } else {
    //   onUrl('')
    // }
  // }, [hasOthers, onUrl])
  }, [onUrl])
  const handlePick = useCallback(() => {
    onUrl('pick-code')
  }, [onUrl])
  const onOpen = useCallback(() => {
    reOpen('pick-code')
  }, [reOpen])
  return (
    <CabinetBody
      onReturn={handleReturn}
      delay={300}
      onUrl={onUrl}
      userInfo={userInfo}
    >
      <div className='pg-cabinet-code-result'>
        <div className='pg-cabinet-code-result_body'>
          <img
            className='pg-cabinet-code-result_banner'
            src='./assets/box.jpg'
            alt='box'
          />
          {boxName && (
            <div className='pg-cabinet-code-result_box'>
              <Icon
                className='pg-cabinet-code-result_box-icon'
                type='icon-baoguofahuo'
              />
              <span className='pg-cabinet-code-result_box-text'>{boxName}</span>
            </div>
          )}
          <p className='pg-cabinet-code-result_tip'>
            {status === 'open'
              ? `${boxName}门已打开，完成取件后请关闭箱门。`
              : `${boxName}门已关闭`}
          </p>
          <div className='pg-cabinet-code-result_buttons'>
            <div className='pg-cabinet-code-result_button on-click' onClick={onOpen}>
              再次开箱
            </div>
            <div className='pg-cabinet-code-result_button on-click' onClick={handlePick}>继续取件</div>
            <div
              className='pg-cabinet-code-result_button on-click'
              onClick={handleReturn}
            >
              完成取件
            </div>
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetCodeResult)
