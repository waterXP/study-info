import React, { memo, useState, useEffect, useCallback } from 'react'
import './CabinetPickList.styl'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'
import { findWaitTakeList } from '@/api/expressLocker'

const colors = [
  {
    color: { color: '#a855f7' },
    backgroundColor: { backgroundColor: '#fbf6ff' }
  },
  {
    color: { color: '#2c6cfe' },
    backgroundColor: { backgroundColor: '#eff6ff' }
  },
  {
    color: { color: '#10ba82' },
    backgroundColor: { backgroundColor: '#eefff4' }
  },
  {
    color: { color: '#ebb305' },
    backgroundColor: { backgroundColor: '#fefce8' }
  },
  {
    color: { color: '#eb4441' },
    backgroundColor: { backgroundColor: '#fef3f2' }
  }
]

const CabinetPickList = ({
  onUrl,
  deviceCode,
  userInfo,
  handleOpen,
  setLoading
}) => {
  const [list, setList] = useState([])
  useEffect(() => {
    if (userInfo) {
      setLoading(true)
      findWaitTakeList({ deviceCode, takeUserId: userInfo.personId })
        .then(d => {
          if (d.code === 200) {
            setList(d.data || [])
            setList([
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              },
              {
                boxName: '02号柜'
              }
            ])
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [deviceCode, userInfo])
  const openBox = useCallback(box => {
    handleOpen('pick', { ...box, hasOthers: list && list.length > 1 })
  }, [])
  return (
    <CabinetBody delay={90} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-pick-list'>
        <div className='pg-cabinet-pick-list_body'>
          <p className='pg-cabinet-pick-list_title'>{`你有${list.length}个快递待取`}</p>
          <div className='pg-cabinet-pick-list_content'>
            {list.map((v, index) => {
              const { color, backgroundColor } = colors[index % 5]
              return (
                <div key={index} className='pg-cabinet-pick-list_button-wrap'>
                  <div
                    className='pg-cabinet-pick-list_button on-click'
                    style={backgroundColor}
                    onClick={() => {
                      openBox(v)
                    }}
                  >
                    <Icon
                      className='pg-cabinet-pick-list_box-icon'
                      type='icon-baoguofahuo'
                      style={color}
                    />
                    <span className='pg-cabinet-pick-list_button-text'>
                      {v.boxName}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPickList)
