import React, { memo, useEffect, useCallback, useMemo, useState } from 'react'
import './CabinetSave.styl'
import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'

const statusMap = {
  opened: (
    <>
      <span>箱门已经打开，请放好快递后关门，</span>
      <span className='pg-cabinet-save_important'>关门后自动完成存件</span>
    </>
  ),
  closed: '箱门已关闭',
  hasError: '箱门打开失败，请尝试再次操作',
  others: '数据处理中……'
}

const CabinetSave = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState({
    title: '',
    type: '' // opened, closed, hasError, waiting
  })
  useEffect(() => {
    // do open
    setStatus({
      title: '08号箱门',
      type: 'opened'
    })
  }, [])
  const onOpen = useCallback(() => {
    // open again
  }, [])
  const goSave = useCallback(() => {
    navigate('/cabinet-save-query')
  }, [])
  const goMain = useCallback(() => {
    navigate('/cabinet')
  }, [])
  const { tip, inOperate } = useMemo(() => {
    const r = {
      tip: statusMap[status.type] || statusMap.others,
      inOperate: true
    }
    if (status.type === 'closed' || status.type === 'hasError') {
      r.inOperate = false
    }
    return r
  }, [status])

  return (
    <CabinetBody delay={300}>
      <div className='pg-cabinet-save'>
        <p className='pg-cabinet-save_title'>开箱存件</p>
        {status.title && <div className='pg-cabinet-save_box'>08号箱门</div>}
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
    </CabinetBody>
  )
}

export default memo(CabinetSave)
