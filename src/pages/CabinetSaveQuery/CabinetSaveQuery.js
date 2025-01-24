import React, { memo, useCallback, useState } from 'react'
import './CabinetSaveQuery.styl'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'
import CabinetInput from '@/components/CabinetInput'

const sizeList = [
  { value: 'small', text: '小箱' },
  { value: 'middle', text: '中箱' },
  { value: 'large', text: '大箱' }
]

const CabinetSaveQuery = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(null)
  const [size, setSize] = useState('small')
  const [list, setList] = useState([])
  const handleFullChange = useCallback(values => {
    const code = values.join('')
    if (code === '8888') {
      setList([
        { name: '小明', value: 1 },
        { name: '小白', value: 2 },
        { name: '小张', value: 3 },
        { name: '小张', value: 4 },
        { name: '小张', value: 5 },
        { name: '小张', value: 6 }
      ])
    } else if (code === '2222') {
      setList([
        { name: '小明', value: 1 },
        { name: '小白', value: 2 }
      ])
    } else if (code === '1111') {
      setList([{ name: '小明', value: 1 }])
      setCurrent(1)
    } else {
      message.error('未找到收件人')
    }
  }, [])
  const onReturn = useCallback(() => {
    navigate('/cabinet')
  }, [navigate])
  const onSelect = useCallback(target => {
    setCurrent(target)
  }, [])
  const onClear = useCallback(() => {
    setCurrent(null)
    setList([])
  }, [])
  const onOpen = useCallback(() => {
    navigate('/cabinet-save')
  }, [navigate])
  return (
    <CabinetBody delay={300}>
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
            {sizeList.map(({ value, text }) =>
              value === size ? (
                <p
                  key={value}
                  className='pg-cabinet-save-query_option is-current'
                >
                  <span className='pg-cabinet-save-query_text is-current'>
                    {text}
                  </span>
                </p>
              ) : (
                <p
                  key={value}
                  className='pg-cabinet-save-query_option'
                  onClick={() => {
                    setSize(value)
                  }}
                >
                  <span className='pg-cabinet-save-query_text'>{text}</span>
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
