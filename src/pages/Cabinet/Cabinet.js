import React, { memo, useCallback, useMemo, useEffect } from 'react'
import './Cabinet.styl'
// import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'

const Cabinet = ({ onUrl, userInfo, handleFace, setInHiding }) => {
  useEffect(() => {
    const tm = setTimeout(() => {
      setInHiding(true)
    }, 900000)
    return () => {
      clearTimeout(tm)
    }
  }, [])
  const userName = useMemo(
    () => (userInfo && userInfo.personName) || '',
    [userInfo]
  )
  const gotoSave = useCallback(() => {
    handleFace('save-query')
  }, [handleFace])
  const gotoPick = useCallback(() => {
    handleFace('pick-list')
  }, [handleFace])
  const gotoCode = useCallback(() => {
    onUrl('pick-code')
  }, [onUrl])
  return (
    <CabinetBody onUrl={onUrl}>
      <div className='pg-cabinet'>
        <div className='pg-cabinet_header'>
          <div className='pg-cabinet_header-left'>
            <Icon className='pg-cabinet_header-icon' type='icon-mall-l' />
            <span className='pg-cabinet_header-title'>智慧快递柜</span>
          </div>
          <div className='pg-cabinet_header-right'>
            {userName ? (
              <span className='pg-cabinet_header-name'>{`当前用户：${userName}`}</span>
            ) : (
              <span className='pg-cabinet_footer-text'>系统版本: v1.0.0</span>
            )}
          </div>
        </div>
        <div className='pg-cabinet_body'>
          <div className='pg-cabinet_save on-click' onClick={gotoPick}>
            <img
              className='pg-cabinet_save-image'
              src='./assets/pick.png'
              alt='save'
            />
            <span className='pg-cabinet_text'>取件</span>
            <span className='pg-cabinet_tip'>便捷取出您的包裹</span>
          </div>
          <div className='pg-cabinet_pick'>
            <div className='pg-cabinet_pick-self on-click' onClick={gotoSave}>
              <img
                className='pg-cabinet_pick-image'
                src='./assets/save.png'
                alt='pick'
              />
              <span className='pg-cabinet_text'>存件</span>
              <span className='pg-cabinet_tip'>快速存放您的包裹</span>
            </div>
            <div className='pg-cabinet_pick-others on-click' onClick={gotoCode}>
              <img
                className='pg-cabinet_pick-image'
                src='./assets/replace.png'
                alt='replace'
              />
              <div className='pg-cabinet_others-right'>
                <span className='pg-cabinet_text'>代取件</span>
                <span className='pg-cabinet_tip'>帮他人代取包裹</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(Cabinet)
