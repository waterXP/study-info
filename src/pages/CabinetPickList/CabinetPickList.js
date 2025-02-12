import React, { memo, useState, useEffect, useCallback } from 'react'
import './CabinetPickList.styl'
import CabinetBody from '@/components/CabinetBody'
import { findWaitTakeList } from '@/api/expressLocker'

const CabinetPickList = ({ onUrl, deviceCode, userInfo, handleOpen, setLoading }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    if (userInfo) {
      setLoading(true)
      findWaitTakeList({ deviceCode, takeUserId: userInfo.personId }).then(
        d => {
          if (d.code === 200) {
            setList(d.data || [])
          }
        }
      ).finally(() => {
        setLoading(false)
      })
    }
  }, [deviceCode, userInfo])
  const openBox = useCallback(
    box => {
      handleOpen('pick', { ...box, hasOthers: list && list.length > 1 })
    },
    []
  )
  return (
    <CabinetBody delay={90} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-pick-list'>
        <div className='pg-cabinet-pick-list_body'>
          <p className='pg-cabinet-pick-list_title'>{`你有${list.length}个快递待取`}</p>
          <div className='pg-cabinet-pick-list_content'>
            {list.map((v, index) => (
              <div key={index} className='pg-cabinet-pick-list_button-wrap'>
                <div
                  className='pg-cabinet-pick-list_button on-click'
                  onClick={() => {
                    openBox(v)
                  }}
                >
                  <span className='pg-cabinet-pick-list_button-text'>
                    {v.boxName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPickList)
