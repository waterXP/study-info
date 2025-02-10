import React, { memo, useCallback, useEffect, useState } from 'react'
import './CabinetSaveQuery.styl'
import { message } from 'antd'
import CabinetBody from '@/components/CabinetBody'
import CabinetInput from '@/components/CabinetInput'
import { getAvailableLockerBox, findUser } from '@/api/expressLocker'

// const sizeList = [
//   { value: 'small', text: '小箱' },
//   { value: 'middle', text: '中箱' },
//   { value: 'large', text: '大箱' }
// ]

const CabinetSaveQuery = ({ onUrl, userInfo, deviceCode, handleOpen }) => {
  const [sizeList, setSizeList] = useState([])
  const [size, setSize] = useState(null)
  useEffect(() => {
    if (deviceCode) {
      console.log('do more')
      console.log('deviceCode', deviceCode)
      getAvailableLockerBox({ deviceCode }).then(d => {
        if (d.code === 200) {
          const sizeList = (d.data || []).filter(
            ({ lockerBoxes }) => lockerBoxes && lockerBoxes.length > 0
          )
          setSizeList(sizeList)
          setSize(sizeList[0] ? sizeList[0].boxType : null)
        }
      })
    }
  }, [])
  const [current, setCurrent] = useState(null)
  const [list, setList] = useState([])
  const handleFullChange = useCallback(values => {
    const code = values.join('')
    findUser({
      phoneSuffix: code
    }).then(d => {
      if (d.code === 200) {
        const list = d.data
        if (list && list.length > 0) {
          if (list.length === 1) {
            setCurrent(list[0].userId)
          } else {
            setCurrent(null)
          }
          setList(list)
        } else {
          message.error('未找到收件人')
        }
      }
    })
  }, [])
  const onReturn = useCallback(() => {
    onUrl('')
  }, [onUrl])
  const onSelect = useCallback(target => {
    setCurrent(target)
  }, [])
  const onClear = useCallback(() => {
    setCurrent(null)
    setList([])
  }, [])
  const onOpen = useCallback(() => {
    console.log(current)
    console.log(list)
    console.log(size)
    console.log(sizeList)
    const receiver = list.find(({ userId }) => userId === current)
    const targetType = sizeList.find(({ boxType }) => boxType === size)
    const box =
      targetType && targetType.lockerBoxes && targetType.lockerBoxes[0]
    if (!receiver) {
      message.error('未找到收件人')
      return
    }
    if (!box) {
      message.error('未找到箱子')
      return
    }
    handleOpen('save', receiver, box)
    // if (window.plus) {
    //   window.plus.android.invoke(
    //     'com.dcp.application.biz.facade.ExpressLockerFacade',
    //     'openLockerDoor',
    //     1,
    //     1
    //   )
    // }
    // onUrl('save')
  }, [list, current, size, sizeList])
  return (
    <CabinetBody delay={300} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-save-query'>
        <div className='pg-cabinet-save-query_input-box'>
          <CabinetInput
            title='收件人手机尾号'
            onFullChange={handleFullChange}
            list={list}
            current={current}
            onSelect={onSelect}
            onClear={onClear}
          />
        </div>
        <div className='pg-cabinet-save-query_detail'>
          <p className='pg-cabinet-save-query_topic'>选择箱子大小</p>
          <div className='pg-cabinet-save-query_row'>
            {sizeList.map(({ boxType, typeLabel, lockerBoxes }) =>
              boxType === size ? (
                <p
                  key={boxType}
                  className='pg-cabinet-save-query_option is-current'
                >
                  <span className='pg-cabinet-save-query_text is-current'>
                    {`${typeLabel}(${lockerBoxes.length})`}
                  </span>
                </p>
              ) : (
                <p
                  key={boxType}
                  className='pg-cabinet-save-query_option'
                  onClick={() => {
                    setSize(boxType)
                  }}
                >
                  <span className='pg-cabinet-save-query_text'>
                    {`${typeLabel}(${lockerBoxes.length})`}
                  </span>
                </p>
              )
            )}
          </div>
          <div className='pg-cabinet-save-query_buttons'>
            {current && size ? (
              <div
                className='pg-cabinet-save-query_button on-click'
                onClick={onOpen}
              >
                开锁
              </div>
            ) : (
              <div className='pg-cabinet-save-query_button is-disabled'>
                开锁
              </div>
            )}
            <div
              className='pg-cabinet-save-query_button on-click'
              onClick={onReturn}
            >
              返回
            </div>
          </div>
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetSaveQuery)
