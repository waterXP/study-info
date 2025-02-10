import React, { memo, useState, useEffect, useCallback } from 'react'
import './CabinetPickList.styl'
import CabinetBody from '@/components/CabinetBody'
import { findWaitTakeList } from '@/api/expressLocker'

const CabinetPickList = ({ onUrl, deviceCode, userInfo }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    if (userInfo) {
      findWaitTakeList({ deviceCode, takeUserId: userInfo.personId }).then(d => {
        console.log('d', d)
      })
    }
    setList([
      {
        id: '01',
        text: '01号箱'
      },
      {
        id: '02',
        text: '02号箱'
      },
      {
        id: '03',
        text: '03号箱'
      },
      {
        id: '07',
        text: '07号箱'
      },
      {
        id: '08',
        text: '08号箱'
      },
      {
        id: '12',
        text: '12号箱'
      }
    ])
  }, [deviceCode, userInfo])
  const openBox = useCallback(() => {
    onUrl('pick')
  }, [onUrl])
  return (
    <CabinetBody delay={90} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-pick-list'>
        <div className='pg-cabinet-pick-list_body'>
          <p className='pg-cabinet-pick-list_title'>{`你有${list.length}个快递待取`}</p>
          <div className='pg-cabinet-pick-list_content'>
            {list.map(({ id, text }) => (
              <div key={id} className='pg-cabinet-pick-list_button-wrap'>
                <div
                  className='pg-cabinet-pick-list_button on-click'
                  onClick={openBox}
                >
                  <span className='pg-cabinet-pick-list_button-text'>
                    {text}
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
