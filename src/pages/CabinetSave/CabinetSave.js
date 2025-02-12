import React, { memo, useEffect, useCallback, useMemo, useState } from 'react'
import './CabinetSave.styl'
// import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'

const statusMap = {
  open: (
    <>
      <span>箱门已经打开，请放好快递后关门，</span>
      <span className='pg-cabinet-save_important'>关门后自动完成存件</span>
    </>
  ),
  close: '箱门已关闭，存件完成！',
  hasError: '箱门打开失败，请尝试再次操作',
  others: '数据处理中……'
}

const CabinetSave = ({ onUrl, userInfo, doorInfo, reOpen }) => {
  const [status, setStatus] = useState({
    title: '',
    type: '' // open, close, hasError, waiting
  })
  useEffect(() => {
    const { boxName, status } = doorInfo
    setStatus({
      title: boxName,
      type: status
    })
  }, [doorInfo])
  const onOpen = useCallback(() => {
    // open again
    reOpen('save')
  }, [reOpen])
  const goSave = useCallback(() => {
    onUrl('save-query')
  }, [onUrl])
  const goMain = useCallback(() => {
    onUrl('')
  }, [onUrl])
  const { tip, inOperate } = useMemo(() => {
    const r = {
      tip: statusMap[status.type] || statusMap.others,
      inOperate: true
    }
    if (status.type === 'close' || status.type === 'hasError') {
      r.inOperate = false
    }
    return r
  }, [status])

  return (
    <CabinetBody delay={300} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-save'>
        <div className='pg-cabinet-save_body'>
          <p className='pg-cabinet-save_title'>开箱存件</p>
          {status.title && (
            <div className='pg-cabinet-save_box'>{status.title}</div>
          )}
          <p className='pg-cabinet-save_tip'>{tip}</p>
          {inOperate ? (
            <div className='pg-cabinet-save_buttons'>
              <div className='pg-cabinet-save_button is-disabled'>再次开箱</div>
              <div className='pg-cabinet-save_button is-disabled'>继续存件</div>
              <div className='pg-cabinet-save_button is-disabled'>返回首页</div>
            </div>
          ) : (
            <div className='pg-cabinet-save_buttons'>
              <div className='pg-cabinet-save_button on-click' onClick={onOpen}>
                再次开箱
              </div>
              <div className='pg-cabinet-save_button on-click' onClick={goSave}>
                继续存件
              </div>
              <div className='pg-cabinet-save_button on-click' onClick={goMain}>
                返回首页
              </div>
            </div>
          )}
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetSave)
