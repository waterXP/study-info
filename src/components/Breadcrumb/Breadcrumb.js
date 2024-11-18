import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Breadcrumb.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextButton from '@com/Buttons/TextButton'

const Breadcrumb = ({ to = '/', children, noTop, title, ex }) => {
  const dispatch = useDispatch()
  const { showCn, showEx, displayType } = useSelector(
    ({ displayType, showEx, showCn }) => ({
      showCn,
      showEx,
      displayType
    })
  )
  const navigate = useNavigate()
  const onClick = useCallback(
    e => {
      e.stopPropagation()
      if (typeof to === 'function') {
        to()
      } else {
        navigate(to)
      }
    },
    [to, navigate]
  )
  const onHome = useCallback(
    e => {
      e.stopPropagation()
      navigate('/menu')
    },
    [navigate]
  )
  const changeCn = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayCn' })
  }, [])
  const changeEx = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayEx' })
  }, [])
  const changeDisplayType = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayType' })
  }, [])
  return (
    <div className='com-breadcrumb'>
      <div className='com-breadcrumb_left'>
        <span className='com-breadcrumb_flag'>&lt;&nbsp;</span>
        {!noTop && (
          <>
            <TextButton onClick={onHome}>首页</TextButton>
            <span>&nbsp;/&nbsp;</span>
          </>
        )}
        <TextButton onClick={onClick}>{children}</TextButton>
        {title && <span>&nbsp;&nbsp;{title}</span>}
      </div>
      <div className='com-breadcrumb_right'>
        {ex && (
          <span
            className={showEx ? 'com-breadcrumb_on' : 'com-breadcrumb_off'}
            onClick={changeEx}
          >
            ex
          </span>
        )}
        <span
          className={showCn ? 'com-breadcrumb_on' : 'com-breadcrumb_off'}
          onClick={changeCn}
        >
          cn
        </span>
        <span className='com-breadcrumb_on' onClick={changeDisplayType}>
          {displayType}
        </span>
      </div>
    </div>
  )
}
Breadcrumb.propTypes = {}

export default memo(Breadcrumb)
