import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react'
import './CabinetReturn.styl'
import Icon from '@com/Icon'

const CabinetReturn = ({ delay, onClick, onUrl, userInfo }) => {
  const userName = useMemo(
    () => (userInfo && userInfo.personName) || '',
    [userInfo]
  )
  const refTm = useRef(null)
  const [time, setTime] = useState(delay)
  const gotoMain = useCallback(() => {
    if (onClick) {
      onClick()
    } else {
      onUrl('')
    }
  }, [onClick, onUrl])
  const onTime = useCallback(
    time => {
      refTm.current = setTimeout(() => {
        refTm.current = null
        if (time === 0) {
          onUrl('')
        } else {
          const nextTime = time - 1
          setTime(nextTime)
          onTime(nextTime)
        }
      }, 1000)
    },
    [onUrl]
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
      <div className='pg-cabinet-return_right'>
        {userName && (
          <>
            <Icon className='pg-cabinet-return_user-icon' type='icon-customer-fill' />
            <span className='pg-cabinet-return_name'>{`当前用户：${userName}`}</span>
          </>
        )}
        <span className='com-cabinet-return_time'>{time}</span>
      </div>
    </div>
  )
}

export default memo(CabinetReturn)
