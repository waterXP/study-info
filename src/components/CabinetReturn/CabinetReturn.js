import React, { memo, useRef, useState, useEffect, useCallback } from 'react'
import './CabinetReturn.styl'
import { useNavigate } from 'react-router-dom'
import Icon from '@com/Icon'

const CabinetReturn = ({ delay, onClick }) => {
  const refTm = useRef(null)
  const [time, setTime] = useState(delay)
  const navigate = useNavigate()
  const gotoMain = useCallback(() => {
    if (onClick) {
      onClick()
    } else {
      navigate('/cabinet')
    }
  }, [navigate, onClick])
  const onTime = useCallback(
    time => {
      refTm.current = setTimeout(() => {
        refTm.current = null
        if (time === 0) {
          navigate('/cabinet')
        } else {
          const nextTime = time - 1
          setTime(nextTime)
          onTime(nextTime)
        }
      }, 1000)
    },
    [navigate]
  )
  useEffect(() => {
    onTime(delay)
  }, [delay])
  useEffect(
    () => () => {
      if (refTm.current) {
        clearTimeout(refTm.current)
        refTm.current = null
      }
    },
    []
  )
  return (
    <div className='com-cabinet-return'>
      <div className='com-cabinet-return_button' onClick={gotoMain}>
        <Icon className='com-cabinet-return_icon' type='icon-fanhui' />
        <span className='com-cabinet-return_text'>返回</span>
      </div>
      <span className='com-cabinet-return_time'>{time}</span>
    </div>
  )
}

export default memo(CabinetReturn)
