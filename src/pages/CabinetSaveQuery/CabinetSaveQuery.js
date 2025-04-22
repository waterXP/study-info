import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import './CabinetSaveQuery.styl'
import { message } from 'antd'
import CabinetBody from '@/components/CabinetBody'
import CabinetInput from '@/components/CabinetInput'
import { getAvailableLockerBox, findUser } from '@/api/expressLocker'

const CabinetSaveQuery = ({
  onUrl,
  userInfo,
  deviceCode,
  handleOpen,
  setLoading
}) => {
  const refTm = useRef(0)
  const [sizeList, setSizeList] = useState([])
  const [size, setSize] = useState(null)
  useEffect(() => {
    if (deviceCode) {
      setLoading(true)
      getAvailableLockerBox({ deviceCode })
        .then(d => {
          if (d.code === 200) {
            const sizeList = (d.data || []).filter(
              ({ lockerBoxes }) => lockerBoxes && lockerBoxes.length > 0
            )
            setSizeList(sizeList)
            setSize(sizeList[0] ? sizeList[0].boxType : null)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    return () => {
      if (refTm.current) {
        clearTimeout(refTm.current)
        refTm.current = 0
      }
    }
  }, [])
  const [current, setCurrent] = useState(null)
  const [list, setList] = useState([])
  const handleFullChange = useCallback(values => {
    const code = values.join('')
    setLoading(true)
    findUser({
      phoneSuffix: code
    })
      .then(d => {
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
      .finally(() => {
        setLoading(false)
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
  const refBusy = useRef(false)
  const onOpen = useCallback(() => {
    if (refBusy.current) {
      return
    }
    refBusy.current = true
    refTm.current = setTimeout(() => {
      refBusy.current = false
    }, 500)
    const receiver = list.find(({ userId }) => userId === current)
    const targetType = sizeList.find(({ boxType }) => boxType === size)
    const index = targetType.lockerBoxes
      ? Math.floor(Math.random() * targetType.lockerBoxes.length)
      : 0
    const box =
      targetType &&
      targetType.lockerBoxes &&
      (targetType.lockerBoxes[index] || targetType.lockerBoxes[0])
    if (!receiver) {
      message.error('未找到收件人')
      return
    }
    if (!box) {
      message.error('未找到箱子')
      return
    }
    handleOpen('save', box, receiver)
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
                    {typeLabel}
                  </span>
                  <span className='pg-cabinet-save-query_count is-current'>
                    {`剩余：${lockerBoxes.length}`}
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
                    {typeLabel}
                  </span>
                  <span className='pg-cabinet-save-query_count'>
                    {`剩余：${lockerBoxes.length}`}
                  </span>
                </p>
              )
            )}
          </div>
          <div className='pg-cabinet-save-query_buttons'>
            {current && size ? (
              <div
                className='pg-cabinet-save-query_button is-primary on-click'
                onClick={onOpen}
              >
                开锁
              </div>
            ) : (
              <div className='pg-cabinet-save-query_button is-primary is-disabled'>
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
